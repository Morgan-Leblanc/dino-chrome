import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import scoreRoutes from './scores.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/scores', scoreRoutes);

export default router;