import model from '../db/models';
import bcrypt from 'bcrypt';
import crypto from 'randombytes';

const { User, VerificationCode } = model;

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
   * @param {String} user
   * @returns {Object} user
   */
  static async getUser(username) {
    const user = await User.findOne({ raw: true, where: { username: username } });
    return user;
  }
  /**
   *
   * @param {String} user
   * @returns {Object} generate code
   */
  static async createVerification(user) {
    const generatecode = VerificationCode.create({
      userID: user,
      code: parseInt(crypto(2).toString('hex'), 16),
    });
    return generatecode;
  }
  /**
   *
   * @param {String} code
   * @returns {object} verified code
   */
  static async verifyCode(code) {
    const verifyCode = await VerificationCode.findOne({
      where: { code: code },
    });
    if (verifyCode) {
      return verifyCode;
    } else {
      return 'Code expired';
    }
  }
  /**
   *
   * @returns {Object} updated user
   */
  static async resetPassword(password, userID) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.update({ passkey: hashedPassword }, { where: { id: userID } });
    return user;
  }
}

export default UserService;
