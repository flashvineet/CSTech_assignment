import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({
firstName: { type: String, required: true },
phone: { type: String, required: true },
notes: { type: String },
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

export default mongoose.model('DistributedItem', itemSchema);