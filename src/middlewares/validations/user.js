import joi from 'joi';
import model from '../../db/models/index';
import { signupSchema } from './schema/user';
import bcrypt from 'bcrypt';
const { User } = model;

/**
 *  user validatons
 */
class UserValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {Object} user schema
   */
  static async signupValidator(req, res, next) {
    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      };
      const checkUser = signupSchema.validate(user, { abortEarly: false });
      const Errors = [];

      if (checkUser.error) {
        const { details } = checkUser.error;
        for (let i = 0; i < details.length; i += 1) {
          Errors.push(details[i].message.replace('"', '').replace('"', ''));
        }
        return res.status(400).json({ error: Errors });
      }
      if(user.password !== user.confirmPassword) {
        Errors.push('Password don\'t match')
        return res.status(400).json({ error: Errors });
      };

      const usernameExist = await User.findOne({ where: { username: user.username } });
      if (usernameExist)
        return res.status(409).json({
          error: 'username already taken, Please choose another!',
        });
      next();
    } catch (error) {
      return res.status(500).json({ error: 'server error' });
    }
  }
}
export default UserValidation;
