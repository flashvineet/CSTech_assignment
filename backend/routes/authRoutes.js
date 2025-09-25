import express from 'express';
import { body } from 'express-validator';
import { registerAdmin, loginAdmin } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })], registerAdmin);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], loginAdmin);

export default router;