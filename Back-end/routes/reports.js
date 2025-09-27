const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// POST /reports -> create a report
router.post('/', async (req, res) => {
  try {
    const { title, description, userId, location, status } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'title and description required' });
    const created = await Report.create({ title, description, userId, location, status });
    res.status(201).json(created);
  } catch (err) {
    console.error('Create report error:', err);
    res.status(400).json({ error: 'invalid payload' });
  }
});

// GET /reports -> list reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error('List reports error:', err);
    res.status(500).json({ error: 'internal error' });
  }
});

// GET /reports/:id
router.get('/:id', async (req, res) => {
  try {
    const r = await Report.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'not found' });
    res.json(r);
  } catch (err) {
    res.status(400).json({ error: 'invalid id' });
  }
});

// DELETE /reports/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'not found' });
    res.json({ message: `report ${req.params.id} deleted` });
  } catch (err) {
    res.status(400).json({ error: 'invalid id' });
  }
});

module.exports = router;
