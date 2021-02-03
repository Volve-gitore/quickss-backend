import TokenHandler from '../helpers/tokenHandler';
import UserService from '../services/user';
import { userData } from '../middlewares/validations/user';
import bcrypt from 'bcrypt';

import { sendVerificationEmail, sendSMS } from '../helpers/sendVerificationEmail';

class UserManager {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} created user info
   */
  static async registerUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      const { passkey, ...userInfo } = user;
      const token = await TokenHandler.generateToken({
        phoneNo: userInfo.phoneNo,
        role: userInfo.role,
      });

      return res.status(201).json({
        message: 'thank you for joining us, Please check your phone for verification',
        user: userInfo,
        token,
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(500).json({ error: 'server error' });
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {Object} user
   */
  static async signIn(req, res) {
    try {
      const { phoneNo, password } = req.body;
      const user = await UserService.getUser(phoneNo.trim());
      if (user === null) return res.status(404).json({ error: `${phoneNo} not found` });

      if (!user.isVerified)
        return res.status(401).json({
          error: 'account not verified, please check your phone message for verification',
        });

      if (!bcrypt.compareSync(password, user.passkey))
        return res.status(401).json({ error: 'incorrect password' });

      const payload = {
        phoneNo: user.phoneNo,
        role: user.role,
      };
      const token = await TokenHandler.generateToken(payload);
      const { passkey, ...userInfo } = user;

      return res.status(200).json({
        message: 'successfully logged in',
        user: userInfo,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'internal server error',
      });
    }
  }
  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {String} acknowledgement message
   */
  static async forgotPassword(req, res) {
    try {
      const { userAccount } = req.body;
      const isEmail = userAccount.includes('@');
      const isPhone = userAccount.startsWith('+');
      var user = JSON.parse(userData);
      const generatedCode = await UserService.createVerification(user.id);

      if (isEmail === true && generatedCode) {
        const resetEmail = sendVerificationEmail(userAccount, generatedCode.code);
        if (resetEmail !== null) {
          return res.status(200).json({
            message: 'please check your email for password reset',
          });
        }
      }
      if (isPhone === true && generatedCode) {
        const resetSms = sendSMS(userAccount, generatedCode.code);
        if (resetSms !== null) {
          return res.status(200).json({
            message: `We\'ve sent verification code to ${userAccount}.Enter that code to reset your password`,
          });
        } else {
          return res.status(400).json({
            message: resetSms,
          });
        }
      }
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: 'server error' });
    }
  }
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} success message
   */
  static async resetPassword(req, res) {
    try {
      const { password } = req.body;
      const { usercode } = req.params;

      const verifyCode = await UserService.verifyCode(usercode);

      if (typeof verifyCode.userID !== 'undefined') {
        const resetpassword = await UserService.resetPassword(password, verifyCode.userID);
        if (resetpassword[0] === 1) {
          return res.status(200).json({
            message: 'password changed successfully',
          });
        }
      }
      return res.status(400).json({
        errors: verifyCode,
      });
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }
}

export default UserManager;
