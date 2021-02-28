import joi from 'joi';

export const signupSchema = joi.object().keys({
  fullName: joi.string().min(4).required().label('fullname'),
  email: joi.string().email(),
  phoneNo: joi.string().min(10).max(15).message('invalid phone number').required(),
  password: joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .message('password must contain atleast 8 characters(upper/lower case, number & symbol)!')
    .required()
    .label('password'),
confirmPassword: joi.any().valid(joi.ref('password'))
});

export const signInSchema = joi.object().keys({
  phoneNo: joi
    .string()
    .regex(/^\S+$/)
    .message('please remove spaces!')
    .min(9)
    .required()
    .label('phone number'),
  password: joi.string().required().label('password'),
});

export const passwordForgotSchema = joi.object().keys({
  userAccount: joi.string().required(),
});

export const passwordResetSchema = joi.object().keys({
  password: joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .message('password must contain atleast 8 characters(upper/lower case, number & symbol)!')
    .required()
    .label('password'),
  confirmPassword: joi.string().required(),
  usercode: joi.string().required(),
});
