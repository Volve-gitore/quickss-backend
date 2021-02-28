import express from 'express';
import user from './user';
import client from "./client";

const router = express.Router();

router.use('/api/user', user);
router.use('/api/clients', client);

export default router;
