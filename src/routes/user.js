import express from 'express';
import userController from '../controllers/user';
import userValidation from '../middlewares/validations/user';

const router = express.Router();

router.post('/auth/signup', userValidation.signupValidator, userController.registerUser);

export default router;