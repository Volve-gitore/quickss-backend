import joi from 'joi';


class UserValidation {

   /**
   *
   * @param {Object} req
   * @returns { Object} 
   */
  static checkForgotPasswordData(req) {
    const passwordResetSchema = joi.object().keys({
      userAccount: joi.string().required(),
    });
    const resetData = {
      userAccount: req.userAccount
    };
    const validateResetPassword = passwordResetSchema.validate(resetData);
    if (validateResetPassword.error) {
      return (validateResetPassword.error.details[0].message.replace('"', '').replace('"', ''));
    }
    return resetData;
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns { Object} 
   */
  static checkResetPasswordData(req) {
    const passwordResetSchema = joi.object().keys({
      password: joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
      confirmPassword: joi.string().required(),
    });
    const resetPasswordData = {
      password: req.password,
      confirmPassword:req.confirmPassword
    };

    const validateResetPassword = passwordResetSchema.validate(
      resetPasswordData,
      { abortEarly: false }
    );

    if (validateResetPassword.error) {
      if (validateResetPassword.error.details[0].message.endsWith('/^[a-zA-Z0-9]{8,30}$/')) {
        return ('your password should contain an uppercase, lowercase and a number');
      }
      const errors = [];
      for (let i = 0; i < validateResetPassword.error.details.length; i += 1) {
        errors.push(validateResetPassword.error.details[i].message.replace('"', '').replace('"', ''));
      }
      return (errors);
    }

    if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
      return ('password doesn\'t match');
    }
    return resetPasswordData;
  }
}
export default UserValidation;
