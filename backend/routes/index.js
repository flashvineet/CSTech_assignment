import express from 'express';
import authRoutes from './authRoutes.js';
import agentRoutes from './agentRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/agents', agentRoutes);
router.use('/upload', uploadRoutes);

export default router;