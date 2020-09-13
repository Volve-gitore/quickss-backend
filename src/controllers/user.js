import TokenHandler from '../helpers/tokenHandler';
import UserService from '../services/user';

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

      const { username, email, phoneNo, role } = user.dataValues;
      const token = await TokenHandler.generateToken({
        username,
        email,
        phoneNo,
        role,
      });

      return res.status(201).json({
        message: 'Thank you for joining us, Please check your phone for verification',
        user: {
          username,
          phoneNo,
          token,
        },
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(500).json({ error: 'server error' });
    }
  }
}

export default UserManager;
