const { v4: uuidv4 } = require('uuid');

const users = new Map();
const reports = new Map();

function createUser({ name, hobby, email }) {
  const id = uuidv4();
  const user = { id, name, hobby: hobby || '', email: email || '' };
  users.set(id, user);
  return user;
}

function getUsers() {
  return Array.from(users.values());
}

function getUser(id) {
  return users.get(id) || null;
}

function updateUser(id, patch) {
  if (!users.has(id)) return null;
  const existing = users.get(id);
  const updated = { ...existing, ...patch, id };
  users.set(id, updated);
  return updated;
}

function deleteUser(id) {
  return users.delete(id);
}

function createReport({ title, description, userId, location }) {
  const id = uuidv4();
  const report = { id, title, description, userId: userId || null, location: location || null, createdAt: new Date().toISOString() };
  reports.set(id, report);
  return report;
}

function getReports() {
  return Array.from(reports.values());
}

function getReport(id) {
  return reports.get(id) || null;
}

function deleteReport(id) {
  return reports.delete(id);
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createReport,
  getReports,
  getReport,
  deleteReport,
};
