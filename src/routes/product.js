import express from 'express';
import productController from '../controllers/product';
import validator from '../middlewares/validator';
import { productSchema } from '../validations/schema/product';

const router = express.Router();

router.post('/', validator(productSchema), productController.createProduct);
router.get('/all/:clientId', productController.getAllproduct);
router.get('/search/one/', productController.getOneProduct);
router.get('/:id/update', productController.updateProduct);
router.delete('/', productController.deleteProduct);

export default router;
