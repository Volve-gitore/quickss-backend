import express from 'express';
import roleController from '../controllers/role';
import validator from '../middlewares/validator';
import auth from '../middlewares/auth'
import { roleSchema } from '../validations/schema/role';

const router = express.Router();

router.post('/', auth.grantAccess('createAny', 'role'), validator(roleSchema), roleController.createRole);
router.get('/', auth.grantAccess('readAny', 'role'), roleController.getRoles);

export default router;
