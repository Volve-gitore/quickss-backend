import express from 'express';
import userController from '../controllers/user';
import {
  signInSchema,
  signupSchema,
  passwordForgotSchema,
  passwordResetSchema,
} from '../validations/schema/user';
import validator from '../middlewares/validator';
import userMiddleware from '../middlewares/user';

const router = express.Router();

router.post('/auth/signup', validator(signupSchema), userController.registerUser);
router.post('/auth/signin', validator(signInSchema), userController.signIn);
router.post(
  '/forgot-password',
  validator(passwordForgotSchema),
  userMiddleware.forgotPasswordValidator,
  userController.forgotPassword,
);
router.post('/reset-password/:usercode', validator(passwordResetSchema), userController.resetPassword);

export default router;
