import express from 'express';
import typeController from '../controllers/type';
import validator from '../middlewares/validator';
import { groupCategoryTypeSchema} from '../validations/schema/groupCategoryType';

const router = express.Router();

// router.post('/', validator(groupCategoryTypeSchema), typeController.createType);
router.post('/', typeController.createBulkTypes);
router.get('/all/:clientId', typeController.getAllType);
router.get('/:id', typeController.getTypeById);
router.get('/:id/update', typeController.updateType);
router.delete('/:id', typeController.deleteType);

export default router;
