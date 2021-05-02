import express from 'express';
import user from './user';
import client from './client';
import type from './type';
import group from './group';
import category from './category';
import subCategory from './subCategory';
import product from './product';

const router = express.Router();

router.use('/api/user', user);
router.use('/api/clients', client);
router.use('/api/type', type);
router.use('/api/group', group);
router.use('/api/category', category);
router.use('/api/subCategory', subCategory);
router.use('/api/product', product);

export default router;
