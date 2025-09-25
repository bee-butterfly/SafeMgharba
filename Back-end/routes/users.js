const express = require('express');
const router = express.Router();
const store = require('../store');

// POST /users/new  -> create new user (image endpoint)
router.post('/new', (req, res) => {
  const { name, hobby, email } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const user = store.createUser({ name, hobby, email });
  res.status(201).json(user);
});

// GET /users -> list users
router.get('/', (req, res) => {
  res.json(store.getUsers());
});

// GET /users/:id -> get single user
router.get('/:id', (req, res) => {
  const user = store.getUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
});

// PUT /user/:id  -> update user (image shows /user/:id)
// We support both /user/:id and /users/:id
router.put('/:id', (req, res) => {
  const updated = store.updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json(updated);
});

// DELETE /users/delete/:id (image endpoint)
router.delete('/delete/:id', (req, res) => {
  const ok = store.deleteUser(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.json({ message: `userId: ${req.params.id} is deleted` });
});

module.exports = router;
