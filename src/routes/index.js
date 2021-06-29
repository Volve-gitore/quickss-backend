import express from 'express';
import user from './user';
import client from './client';
import type from './type';
import group from './group';
import category from './category';
import subCategory from './subCategory';
import product from './product';
import role from './role';
import auth from '../middlewares/auth'

const router = express.Router();

router.use('/api/user', user);
router.use('/api/clients', client);
router.use('/api/type', auth.allowIfHasToken, type);
router.use('/api/group', auth.allowIfHasToken, group);
router.use('/api/category', auth.allowIfHasToken, category);
router.use('/api/subCategory', auth.allowIfHasToken, subCategory);
router.use('/api/product', auth.allowIfHasToken, product);
router.use('/api/role', auth.allowIfHasToken, role);

export default router;
