import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import XLSX from 'xlsx';
import Agent from '../models/Agent.js';
import DistributedItem from '../models/DistributedItem.js';

const allowedExt = ['.csv', '.xlsx', '.xls'];

const parseCSV = (filePath) =>
  new Promise((resolve, reject) => {
    const items = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (row) => items.push(row))
      .on('end', () => resolve(items))
      .on('error', (err) => reject(err));
  });

const parseXLSX = (filePath) => {
  const wb = XLSX.readFile(filePath);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: '' });
};

export const handleUpload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'File required' });

    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!allowedExt.includes(ext)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Only csv, xls, xlsx allowed' });
    }

    const rows = ext === '.csv' ? await parseCSV(req.file.path) : parseXLSX(req.file.path);
    if (!rows.length) return res.status(400).json({ message: 'Empty file' });

    const agents = await Agent.find().limit(5).sort({ _id: 1 });
    if (!agents.length) return res.status(400).json({ message: 'No agents available' });

    const normalized = rows.map((r) => ({
      firstName: r.FirstName || r['First Name'] || '',
      phone: r.Phone || r['Phone Number'] || r.Mobile || '',
      notes: r.Notes || r.Note || '',
    }));

    const per = Math.floor(normalized.length / agents.length);
    let rem = normalized.length % agents.length;

    const created = [];
    let cursor = 0;

    for (let i = 0; i < agents.length; i++) {
      let take = per + (rem > 0 ? 1 : 0);
      if (rem > 0) rem--;

      const slice = normalized.slice(cursor, cursor + take);
      cursor += take;

      for (const it of slice) {
        const doc = await DistributedItem.create({
          ...it,
          assignedTo: agents[i]._id,
          uploadedBy: req.admin._id,
        });
        created.push(doc);
      }
    }

    fs.unlinkSync(req.file.path);

    const grouped = agents.map((agent) => ({
      agentId: agent._id,
      agentName: agent.name,
      data: created
        .filter((item) => item.assignedTo.toString() === agent._id.toString())
        .map((it) => ({
          firstName: it.firstName,
          phone: it.phone,
          notes: it.notes,
        })),
    }));

    res.status(201).json({
      message: 'Distributed successfully',
      distributedData: grouped, 
    });
  } catch (err) {
    next(err);
  }
};
