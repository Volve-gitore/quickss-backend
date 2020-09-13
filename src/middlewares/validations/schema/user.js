import joi from 'joi';

export const signupSchema = joi.object().keys({
  username: joi
    .string()
    .regex(/^\S+$/)
    .message('please remove spaces between word!')
    .min(4)
    .required()
    .label('Username'),
  email: joi.string().email().insensitive().label('Email'),
  phoneNo: joi.string().min(10).max(12).message('invalid phone number').required(),
  password: joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .message('must contain atleast 8 characters(upper/lower case, number & symbol)!')
    .required()
    .label('Password'),
  confirmPassword: joi.string().required(),
});
