import model from '../db/models/index';

const { Op } = require('sequelize');

const { User } = model;

/**
 *  user validatons
 */
class UserMiddleware {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async forgotPasswordValidator(req, res, next) {
    try {
      const { userAccount } = req.body;
      const userAccountExist = await User.findOne({
        where: { [Op.or]: [{ email: userAccount }, { phoneNo: userAccount }] },
      });

      if (!userAccountExist)
        return res.status(404).json({
          message: "account with that information doesn't exist",
        });
      req.user = userAccountExist;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'server error' });
    }
  }
  //**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @param {object} next
  //  */
  // static async resetPasswordValidator(req, res, next) {
  //   try {
  //     const resetPasswordData = {
  //       password: req.body.password,
  //       confirmPassword: req.body.confirmPassword,
  //       usercode: req.params.usercode,
  //     };

  //     const validateResetPassword = passwordResetSchema.validate(resetPasswordData, { abortEarly: false });
  //     const errors = [];

  //     if (validateResetPassword.error) {
  //       for (let i = 0; i < validateResetPassword.error.details.length; i += 1) {
  //         errors.push(validateResetPassword.error.details[i].message.replace('"', '').replace('"', ''));
  //       }
  //       return res.status(400).json({ message: errors });
  //     }

  //     if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
  //       errors.push("password doesn't match");
  //       return res.status(400).json({ message: errors });
  //     }
  //     next();
  //   } catch (error) {
  //     return res.status(500).json({ message: 'server error' });
  //   }
  // }
}
export default UserMiddleware;
