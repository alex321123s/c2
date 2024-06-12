// /backend/api/routes/mentorRoutes.js

const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const authController = require('../controllers/authController');

// Routes for mentors
router.route('/')
  .get(authController.protect, mentorController.getAllMentors)
  .post(authController.protect, mentorController.createMentor);

router.route('/:id')
  .get(authController.protect, mentorController.getMentor)
  .patch(authController.protect, mentorController.updateMentor)
  .delete(authController.protect, mentorController.deleteMentor);

module.exports = router;
