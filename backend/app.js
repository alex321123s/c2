// /backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const logger = require('./api/utils/logger');

// Import Routes
const ideaRoutes = require('./api/routes/ideaRoutes');
const userRoutes = require('./api/routes/userRoutes');
const authRoutes = require('./api/routes/authRoutes');
const mentorRoutes = require('./api/routes/mentorRoutes');
const eventRoutes = require('./api/routes/eventRoutes');
const resourceRoutes = require('./api/routes/resourceRoutes');
const feedbackRoutes = require('./api/routes/feedbackRoutes');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const validationMiddleware = require('./middleware/validationMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const db = config.get('mongoURI');
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Routes
app.use('/api/ideas', ideaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
