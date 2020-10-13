import TokenHandler from '../helpers/tokenHandler';
import UserService from '../services/user';
import bcrypt from 'bcrypt';

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
        username: userInfo.username,
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
      const { username, password } = req.body;
      const user = await UserService.getUser(username.trim());
      if (user === null) return res.status(404).json({ error: `${username} not found` });

      if (!user.isVerified)
        return res.status(401).json({
          error: 'account not verified, please check your phone message for verification',
        });

      if (!bcrypt.compareSync(password, user.passkey))
        return res.status(401).json({ error: 'incorrect password' });

      const payload = {
        username: user.username,
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
}

export default UserManager;
