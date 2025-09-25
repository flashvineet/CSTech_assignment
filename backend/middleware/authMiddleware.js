import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';


export const protect = async (req, res, next) => {
let token;
const authHeader = req.headers.authorization;
if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];


if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });


try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const admin = await Admin.findById(decoded.id).select('-password');
if (!admin) return res.status(401).json({ message: 'Admin not found' });
req.admin = admin;
next();
} catch (err) {
return res.status(401).json({ message: 'Not authorized, invalid token' });
}
};