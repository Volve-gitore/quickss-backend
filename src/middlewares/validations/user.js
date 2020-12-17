import model from '../../db/models/index';
import { signupSchema, signInSchema, passwordForgotSchema, passwordResetSchema } from './schema/user';
const { Op } = require('sequelize');

const { User } = model;
export var userData;

/**
 *  user validatons
 */
class UserValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async signupValidator(req, res, next) {
    try {
      const user = {
        fullName: req.body.fullName,
        phoneNo: req.body.phoneNo,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      };
      const checkUser = signupSchema.validate(user, { abortEarly: false });
      const errors = [];

      if (checkUser.error) {
        const { details } = checkUser.error;
        for (let i = 0; i < details.length; i += 1) {
          errors.push(details[i].message.replace('"', '').replace('"', ''));
        }
        return res.status(400).json({ error: errors });
      }
      if (user.password !== user.confirmPassword) {
        errors.push("Password don't match");
        return res.status(400).json({ error: errors });
      }

      const usernameExist = await User.findOne({ where: { phoneNo: user.phoneNo } });
      if (usernameExist)
        return res.status(409).json({
          error: 'phone number has been used before',
        });
      next();
    } catch (error) {
      return res.status(500).json({ error: 'server error' });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */

  static async signInValidator(req, res, next) {
    try {
      const credentials = {
        phoneNo: req.body.phoneNo.trim(),
        password: req.body.password,
      };
      const checkCredentials = signInSchema.validate(credentials, {
        abortEarly: false,
      });

      const errors = [];
      if (checkCredentials.error) {
        const { details } = checkCredentials.error;
        for (let i = 0; i < details.length; i += 1) {
          errors.push(details[i].message.replace('"', '').replace('"', ''));
        }
        return res.status(400).json({ error: errors });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: 'server error' });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async forgotPasswordValidator(req, res, next) {
    try {
      const resetData = {
        userAccount: req.body.userAccount,
      };
      const errors = [];

      const validateForgotPassword = passwordForgotSchema.validate(resetData);
      if (validateForgotPassword.error) {
        for (let i = 0; i < validateForgotPassword.error.details.length; i += 1) {
          errors.push(validateForgotPassword.error.details[i].message.replace('"', '').replace('"', ''));
        }
        return res.status(400).json({ message: errors });
      }
      const useraccoutExist = await User.findOne({
        where: { [Op.or]: [{ email: resetData.userAccount }, { phoneNo: resetData.userAccount }] },
      });

      if (!useraccoutExist)
        return res.status(409).json({
          message: 'Account with that information does not exist',
        });
      userData = JSON.stringify(useraccoutExist);
      next();
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async resetPasswordValidator(req, res, next) {
    try {
      const resetPasswordData = {
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        usercode: req.params.usercode,
      };

      const validateResetPassword = passwordResetSchema.validate(resetPasswordData, { abortEarly: false });
      const errors = [];

      if (validateResetPassword.error) {
        for (let i = 0; i < validateResetPassword.error.details.length; i += 1) {
          errors.push(validateResetPassword.error.details[i].message.replace('"', '').replace('"', ''));
        }
        return res.status(400).json({ message: errors });
      }

      if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
        errors.push("password doesn't match");
        return res.status(400).json({ message: errors });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }
}
export default UserValidation;
