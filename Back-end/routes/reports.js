const express = require('express');
const router = express.Router();
const store = require('../store');

// POST /reports -> create a report
router.post('/', (req, res) => {
  const { title, description, userId, location } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'title and description required' });
  const report = store.createReport({ title, description, userId, location });
  res.status(201).json(report);
});

// GET /reports -> list reports
router.get('/', (req, res) => {
  res.json(store.getReports());
});

// GET /reports/:id
router.get('/:id', (req, res) => {
  const r = store.getReport(req.params.id);
  if (!r) return res.status(404).json({ error: 'not found' });
  res.json(r);
});

// DELETE /reports/:id
router.delete('/:id', (req, res) => {
  const ok = store.deleteReport(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.json({ message: `report ${req.params.id} deleted` });
});

module.exports = router;
