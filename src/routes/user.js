import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:userCode', userController.resetPassword);

export default router;