import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';


const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });


export const registerAdmin = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { name, email, password } = req.body;
const exists = await Admin.findOne({ email });
if (exists) return res.status(400).json({ message: 'Admin already exists' });


const hashed = await bcrypt.hash(password, 10);
const admin = await Admin.create({ name, email, password: hashed });
res.status(201).json({ id: admin._id, name: admin.name, email: admin.email, token: genToken(admin._id) });
} catch (err) {
next(err);
}
};


export const loginAdmin = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { email, password } = req.body;
const admin = await Admin.findOne({ email });
if (!admin) return res.status(401).json({ message: 'Invalid credentials' });


const match = await bcrypt.compare(password, admin.password);
if (!match) return res.status(401).json({ message: 'Invalid credentials' });


res.json({ token: genToken(admin._id) });
} catch (err) {
next(err);
}
};