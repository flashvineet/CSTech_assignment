import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { createAgent, listAgents, getAgentLists } from '../controllers/agentController.js';

const router = express.Router();
router.use(protect);
router.post('/', [body('name').notEmpty(), body('email').isEmail(), body('mobile').notEmpty(), body('password').isLength({ min: 6 })], createAgent);
router.get('/', listAgents);
router.get('/:id/lists', getAgentLists);

export default router;