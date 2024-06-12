// /backend/api/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Routes for user management
router.route('/')
    .get(authController.protect, userController.getAllUsers);

router.route('/signup')
    .post(authController.signup);

router.route('/login')
    .post(authController.login);

router.route('/me')
    .get(authController.protect, userController.getMe, userController.getUser)
    .patch(authController.protect, userController.updateMe)
    .delete(authController.protect, userController.deleteMe);

router.route('/:id')
    .get(authController.protect, userController.getUser)
    .patch(authController.protect, userController.updateUser)
    .delete(authController.protect, userController.deleteUser);

module.exports = router;
