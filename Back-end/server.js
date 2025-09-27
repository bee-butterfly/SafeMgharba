require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const reportsRouter = require('./routes/reports');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map((s) => s.trim())
  : undefined; // undefined => reflect request origin
app.use(
  cors({
    origin: allowedOrigins || true,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);

// Basic route
app.get('/', (req, res) => res.send('Safemgharba backend running'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/safemgharba'}`);
  });
}

module.exports = app; // For testing
