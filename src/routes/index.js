import express from 'express';
import user from './user';
import hotelResto from "./hotelResto";

const router = express.Router();

router.use('/api/user', user);
router.use('/api/hotel-resto', hotelResto);

export default router;
