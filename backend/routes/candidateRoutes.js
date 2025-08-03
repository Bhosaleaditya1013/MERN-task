const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET all candidates
router.get('/', async (req, res) => {
  const statusFilter = req.query.status;
  const query = statusFilter ? { status: statusFilter } : {};
  const candidates = await Candidate.find(query).sort({ createdAt: -1 });
  res.json(candidates);
});

// UPDATE status and notes
router.put('/:id', async (req, res) => {
  const { status, notes } = req.body;
  try {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, { status, notes }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
});

module.exports = router;
