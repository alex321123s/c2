// /backend/api/routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authController = require('../controllers/authController');

// Routes for feedback
router.route('/')
  .get(authController.protect, feedbackController.getAllFeedback)
  .post(authController.protect, feedbackController.createFeedback);

router.route('/:id')
  .get(authController.protect, feedbackController.getFeedback)
  .patch(authController.protect, feedbackController.updateFeedback)
  .delete(authController.protect, feedbackController.deleteFeedback);

module.exports = router;
