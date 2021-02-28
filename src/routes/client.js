import express from 'express';
import clientController from '../controllers/Client';
import { multerUploads } from '../middlewares/multer';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import validator from '../middlewares/validator';
import { clientSchema } from '../validations/schema/client';

const router = express.Router();

router.use('*', cloudinaryConfig);
router.post('/', multerUploads, validator(clientSchema), clientController.registerClient);
router.get('/', clientController.getClients);

export default router;
