import express from 'express';
import userController from '../controllers/user';
import userValidation from '../middlewares/validations/user';

const router = express.Router();

router.post('/auth/signup', userValidation.signupValidator, userController.registerUser);
router.post('/auth/signin', userValidation.signInValidator, userController.signIn);
router.post('/forgot-password',userValidation.forgotPasswordValidator, userController.forgotPassword);
router.post('/reset-password/:usercode',userValidation.resetPasswordValidator, userController.resetPassword);

export default router;
