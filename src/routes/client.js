import express from 'express';
import clientController from '../controllers/Client';
import { multerUploads } from '../middlewares/multer';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import validator from '../middlewares/validator';
import { clientSchema } from '../validations/schema/client';
import auth from '../middlewares/auth'

const router = express.Router();

router.use('*', cloudinaryConfig);
router.post('/', auth.grantAccess('createOwn', 'hotelResto'), multerUploads, validator(clientSchema), clientController.registerClient);
router.get('/', auth.grantAccess('readAny', 'hotelResto'), clientController.getClients); 

export default router;
