import model from '../db/models';
import bcrypt from 'bcrypt';
import crypto from 'randombytes';

const { User, VerificationCode, Role } = model;

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
    const { fullName, phoneNo, password, email, roleId } = userInfo;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullName,
      phoneNo,
      password: hashedPassword,
      role: 'client',
      isVerified: true,
      email, 
      roleId,
    };
    const user = (await User.create(newUser)).get({ plain: true });
    return user;
  }

  /**
   *
   * @param {String} user
   * @returns {Object} user
   */
  static async getUserByPhone(phoneNo) {
    const user = await User.findOne({ raw: true, where: { phoneNo } });
    return user;
  }

  /**
   *
   * @param {String} user
   * @returns {Object} user
   */
  static async getUserByEmail(email) {
    const user = await User.findOne({ raw: true, where: { email } });
    return user;
  }

  /**
   * 
   * @param {*} id 
   */
    static async getRoleById(id) {
      const user = await Role.findOne({ raw: true, where: { id } });
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
