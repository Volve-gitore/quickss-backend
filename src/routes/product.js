import express from 'express';
import productController from '../controllers/product';
import validator from '../middlewares/validator';
import { productSchema } from '../validations/schema/product';
import auth from '../middlewares/auth'
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUploads } from '../middlewares/multerProduct';

const router = express.Router();

router.use('*', cloudinaryConfig);
router.post('/', auth.grantAccess('createOwn', 'product'), multerUploads, validator(productSchema), productController.createProduct);
router.get('/all/:clientId', auth.grantAccess('readOwn', 'product'), productController.getAllproduct);
router.get('/search/one/', auth.grantAccess('readOwn', 'product'), productController.getOneProduct);
router.get('/:id/update', auth.grantAccess('updateOwn', 'product'), productController.updateProduct);
router.delete('/', auth.grantAccess('deleteOwn', 'product'), productController.deleteProduct);

export default router;
