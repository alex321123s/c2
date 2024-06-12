// /backend/api/utils/validators.js

const { body, validationResult } = require('express-validator');

// Validate idea submission
const validateIdeaSubmission = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isUUID()
    .withMessage('User ID must be a valid UUID'),
];

// Validate user registration
const validateUserRegistration = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ max: 50 })
    .withMessage('Username cannot be more than 50 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

// Validate feedback submission
const validateFeedbackSubmission = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isUUID()
    .withMessage('User ID must be a valid UUID'),
  body('feedback')
    .notEmpty()
    .withMessage('Feedback is required')
    .isLength({ max: 1000 })
    .withMessage('Feedback cannot be more than 1000 characters'),
];

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateIdeaSubmission,
  validateUserRegistration,
  validateFeedbackSubmission,
  handleValidationErrors,
};
