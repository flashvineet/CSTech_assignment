import Agent from '../models/Agent.js';
import DistributedItem from '../models/DistributedItem.js';

export const getStats = async (req, res, next) => {
  try {
    const totalAgents = await Agent.countDocuments();
    const totalRecords = await DistributedItem.countDocuments();

    const totalUploads = await DistributedItem.distinct('uploadedBy').then(docs => docs.length);

    res.json({
      totalAgents,
      totalUploads,
      totalRecords,
    });
  } catch (err) {
    next(err);
  }
};
