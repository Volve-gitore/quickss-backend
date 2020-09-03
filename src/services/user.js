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
   * @returns {Object} returns created user
   */
  static async createUser(userInfo) {
    const { firstName, lastName, username, email, phoneNo, gender, password, role } = userInfo;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      phoneNo,
      gender,
      passkey: hashedPassword,
      role,
      isVerified: false,
    };
    const user = await User.create(newUser);
    return user;
  }
}

export default UserService;
