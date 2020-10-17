import express from 'express';
import hotelRestoController from '../controllers/HotelResto';
import { multerUploads } from '../middlewares/multer';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import hotelRestoValidation from '../middlewares/validations/hotelresto';

const router = express.Router();

router.use('*', cloudinaryConfig);
router.post(
  '/',
  multerUploads,
  hotelRestoValidation.HotelRestoValidator,
  hotelRestoController.registerHotelResto,
);
router.get('/', hotelRestoController.getAllHotelResto);

export default router;
