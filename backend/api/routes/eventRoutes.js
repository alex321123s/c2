// /backend/api/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

// Routes for events
router.route('/')
  .get(authController.protect, eventController.getAllEvents)
  .post(authController.protect, eventController.createEvent);

router.route('/:id')
  .get(authController.protect, eventController.getEvent)
  .patch(authController.protect, eventController.updateEvent)
  .delete(authController.protect, eventController.deleteEvent);

module.exports = router;
