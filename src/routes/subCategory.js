import express from 'express';
import subCategoryController from '../controllers/subCategory';
import validator from '../middlewares/validator';
import { subcategorySchema } from '../validations/schema/subCategory';

const router = express.Router();

router.post('/', validator(subcategorySchema), subCategoryController.createSubCategory);
router.get('/all/:categoryId', subCategoryController.getAllSubCategory);
router.get('/:id', subCategoryController.getSubCategoryById);
router.get('/search/one/', subCategoryController.getOneSubCategory);
router.get('/:id/update', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

export default router;
