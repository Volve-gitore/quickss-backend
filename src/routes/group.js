import express from 'express';
import groupController from '../controllers/group';
import validator from '../middlewares/validator';
import { groupCategoryTypeSchema} from '../validations/schema/groupCategoryType';
import auth from '../middlewares/auth'

const router = express.Router();

router.post('/', auth.grantAccess('createOwn', 'group'), validator(groupCategoryTypeSchema), groupController.createGroup);
router.get('/all/:clientId', auth.grantAccess('readOwn', 'group'), groupController.getAllgroup);
router.get('/:id', auth.grantAccess('readOwn', 'group'), groupController.getgroupById);
router.get('/search/one', auth.grantAccess('readOwn', 'group'), groupController.getGroupByName);
router.get('/:id/update',  auth.grantAccess('updateOwn', 'group'), groupController.updateGroup);
router.delete('/:id',  auth.grantAccess('deleteOwn', 'group'), groupController.deleteGroup);

export default router;