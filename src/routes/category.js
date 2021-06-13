import express from 'express';
import categoryController from '../controllers/category';
import validator from '../middlewares/validator';
import { groupCategoryTypeSchema} from '../validations/schema/groupCategoryType';
import auth from '../middlewares/auth'

const router = express.Router();

router.post('/', auth.grantAccess('createOwn', 'category'), validator(groupCategoryTypeSchema), categoryController.createCategory);
router.get('/all/:clientId', auth.grantAccess('readOwn', 'category'), categoryController.getAllCategory);
router.get('/:id', auth.grantAccess('readOwn', 'category'), categoryController.getCategoryById);
router.get('/search/one/', auth.grantAccess('readOwn', 'category'), categoryController.getOneCategory);
router.get('/:id/update', auth.grantAccess('updateOwn', 'category'), categoryController.updateCategory);
router.delete('/:id', auth.grantAccess('deleteOwn', 'category'), categoryController.deleteCategory);

export default router;
