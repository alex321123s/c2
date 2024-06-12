// /backend/api/routes/resourceRoutes.js

const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authController = require('../controllers/authController');

// Routes for resources
router.route('/')
  .get(authController.protect, resourceController.getAllResources)
  .post(authController.protect, resourceController.createResource);

router.route('/:id')
  .get(authController.protect, resourceController.getResource)
  .patch(authController.protect, resourceController.updateResource)
  .delete(authController.protect, resourceController.deleteResource);

module.exports = router;
