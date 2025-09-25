import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Agent from '../models/Agent.js';
import DistributedItem from '../models/DistributedItem.js';


export const createAgent = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { name, email, mobile, password } = req.body;
const exists = await Agent.findOne({ email });
if (exists) return res.status(400).json({ message: 'Agent already exists' });


const hashed = await bcrypt.hash(password, 10);
const agent = await Agent.create({ name, email, mobile, password: hashed });
res.status(201).json({ id: agent._id, name: agent.name, email: agent.email, mobile: agent.mobile });
} catch (err) {
next(err);
}
};


export const listAgents = async (req, res, next) => {
try {
const agents = await Agent.find().select('-password');
res.json(agents);
} catch (err) {
next(err);
}
};


export const getAgentLists = async (req, res, next) => {
try {
const agentId = req.params.id;
const items = await DistributedItem.find({ assignedTo: agentId });
res.json(items);
} catch (err) {
next(err);
}
};