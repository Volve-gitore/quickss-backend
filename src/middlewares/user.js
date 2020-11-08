import model from '../../db/models/index';
import { signupSchema, signInSchema } from './schema/user';
const { User } = model;

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
        username: req.body.username,
        email: req.body.email,
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

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */

  static async signInValidator(req, res, next) {
    try {
      const credentials = {
        username: req.body.username.trim(),
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
}
export default UserValidation;
