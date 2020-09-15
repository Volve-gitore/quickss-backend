import model from '../db/models';
import bcrypt from 'bcrypt';

const { User } = model;

/**
 * User service
 */
class UserService {
  /**
   *
   * @param {Object} user
   * @returns {Object} created user
   */
  static async createUser(userInfo) {
    const { firstName, lastName, username, email, phoneNo, gender, password } = userInfo;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      phoneNo,
      gender,
      passkey: hashedPassword,
      role: 'client',
      isVerified: false,
    };
    const user = (await User.create(newUser)).get({ plain: true });
    return user;
  }

  /**
   *
   * @param {Object} user
   * @returns {Object} user
   */
  static async getUser(username) {
    const user = await User.findOne({ raw: true, where: { username: username } });
    return user;
  }
}

export default UserService;
