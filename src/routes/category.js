import express from 'express';
import categoryController from '../controllers/category';
import validator from '../middlewares/validator';
import { groupCategoryTypeSchema} from '../validations/schema/groupCategoryType';

const router = express.Router();

router.post('/', validator(groupCategoryTypeSchema), categoryController.createCategory);
router.get('/all/:clientId', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryById);
router.get('/search/one/', categoryController.getOneCategory);
router.get('/:id/update', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
