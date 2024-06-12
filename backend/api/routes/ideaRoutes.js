// /backend/api/routes/ideaRoutes.js

const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const authController = require('../controllers/authController');

// Routes for idea management
router.route('/')
    .get(ideaController.getIdeas)
    .post(authController.protect, ideaController.createIdea);

router.route('/:id')
    .get(ideaController.getIdea)
    .patch(authController.protect, ideaController.updateIdea)
    .delete(authController.protect, ideaController.deleteIdea);

module.exports = router;
