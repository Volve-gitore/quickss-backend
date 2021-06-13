import express from 'express';
import subCategoryController from '../controllers/subCategory';
import validator from '../middlewares/validator';
import { subcategorySchema } from '../validations/schema/subCategory';
import auth from '../middlewares/auth'

const router = express.Router();

router.post('/', auth.grantAccess('createOwn', 'subCategory'), validator(subcategorySchema), subCategoryController.createSubCategory);
router.get('/all/:categoryId', auth.grantAccess('readOwn', 'subCategory'), subCategoryController.getAllSubCategory);
router.get('/:id', auth.grantAccess('readOwn', 'subCategory'), subCategoryController.getSubCategoryById);
router.get('/search/one/', auth.grantAccess('readOwn', 'subCategory'), subCategoryController.getOneSubCategory);
router.get('/:id/update', auth.grantAccess('updateOwn', 'subCategory'), subCategoryController.updateSubCategory);
router.delete('/:id', auth.grantAccess('deleteOwn', 'subCategory'), subCategoryController.deleteSubCategory);

export default router;
