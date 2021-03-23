import express from 'express';
import groupController from '../controllers/group';
import validator from '../middlewares/validator';
import { groupCategoryTypeSchema} from '../validations/schema/groupCategoryType';

const router = express.Router();

router.post('/', validator(groupCategoryTypeSchema), groupController.createGroup);
router.get('/all/:clientId', groupController.getAllgroup);
router.get('/:id', groupController.getgroupById);
router.get('/search/one', groupController.getGroupByName);
router.get('/:id/update', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

export default router;
