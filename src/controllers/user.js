
import Validations from '../middlewares/validations/user';
import {sendVerificationEmail,sendSMS} from '../helpers/sendVerificationEmail';
import CodeVerfication from '../helpers/codeVerfication';
import model from '../db/models';
import crypto from 'randombytes';
import bcrypt from 'bcrypt';
const { User,VerificationCode } = model;


class UserManager {
   /**
   * @param {Object} req
   * @param {Object} res
   * @returns {String} acknowledgement message
   */
  static async forgotPassword(req, res) {
    const checkUserInput = Validations.checkForgotPasswordData(req.body);
    if (!checkUserInput.userAccount) {
      return res.status(400).json({
        error: checkUserInput,
      });
    }
    // =========================verify account using email=================================
    const findUserByEmail = await User.findOne({ where: {email: checkUserInput.userAccount} });
    if (findUserByEmail !== null) {
      const { id,username, email} = findUserByEmail.dataValues;
      const user = {
        id,
        username,
        email
      };
      return VerificationCode.create({
        userID: user.id,
        code: parseInt(crypto(2).toString("hex"), 16)
      }).then((result) => {
      const resetEmail = sendVerificationEmail(user,result.code);
      if (resetEmail !== null) {
        return res.status(200).json({
          message: 'please check your email for password reset',
        });
      }
      return res.status(400).json({
        error: resetEmail,
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
    }
    // ============================verify account using phone Number=========================
    const findUserByPhone = await User.findOne({ where: {phoneNo: checkUserInput.userAccount} });
    if (findUserByPhone !== null) {
      const { id,phoneNo } = findUserByPhone.dataValues;
      const user = {
        id,
        phoneNo
      };
      return VerificationCode.create({
        userID: user.id,
        code: parseInt(crypto(2).toString("hex"), 16)
      }).then((result) => {
      const resetSms= sendSMS(user,result.code);
      if (resetSms !== null) {
        return res.status(200).json({
          message: `We\'ve sent verification code to ${phoneNo}.Enter that code to reset your password`,
        });
      }
      return res.status(400).json({
        error: resetSms,
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
    }
    return res.status(404).json({ error: 'Account with that information does not exist,Please check and try again', });
  }
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} success user password reset message
   */
  static async resetPassword(req, res) {
    try {
      const checkUserData = Validations.checkResetPasswordData(req.body);
      if (checkUserData.password) {
        const verifyCode = await CodeVerfication.verifyCode(req.params.userCode);
        if(typeof verifyCode.userID !== 'undefined'){
          const { password } = checkUserData;
        const hashedPassword = bcrypt.hashSync(password, 10);
          const updatePassword = await User.update(
            { passkey: hashedPassword },
            { where: { id: verifyCode.userID } }
          );

          if (updatePassword[0] === 1) {
            return res.status(200).json({
              message: 'password changed successfully',
            });
          }
        }
        return res.status(400).json({
          errors: verifyCode,
        }); 
      }
      return res.status(400).json({
        errors: checkUserData,
      });
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        error: 'password reset failed, please try again'
      });
    }
  }

}

export default UserManager;