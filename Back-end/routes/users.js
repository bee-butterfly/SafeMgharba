const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users/new  -> create new user (image endpoint)
router.post('/new', async (req, res) => {
  try {
    const { name, hobby, email } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const created = await User.create({ name, hobby, email });
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'email already exists' });
    }
    console.error('Create user error:', err);
    res.status(500).json({ error: 'internal error' });
  }
});

// GET /users -> list users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ error: 'internal error' });
  }
});

// GET /users/:id -> get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'invalid id' });
  }
});

// PUT /user/:id  -> update user (image shows /user/:id)
// We support both /user/:id and /users/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, hobby, email } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { name, hobby, email } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'not found' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'email already exists' });
    }
    res.status(400).json({ error: 'invalid payload or id' });
  }
});

// DELETE /users/delete/:id (image endpoint)
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'not found' });
    res.json({ message: `userId: ${req.params.id} is deleted` });
  } catch (err) {
    res.status(400).json({ error: 'invalid id' });
  }
});

module.exports = router;
