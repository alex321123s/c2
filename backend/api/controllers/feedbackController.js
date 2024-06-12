// /backend/api/controllers/feedbackController.js

const Feedback = require('../models/Feedback');
const { validationResult } = require('express-validator');

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Public
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.json({ success: true, data: feedback });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get feedback by ID
// @route   GET /api/feedback/:id
// @access  Public
exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }

        res.json({ success: true, data: feedback });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { user, comment, rating } = req.body;

    try {
        const newFeedback = new Feedback({
            user,
            comment,
            rating
        });

        const feedback = await newFeedback.save();
        res.json({ success: true, data: feedback });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Private
exports.updateFeedback = async (req, res) => {
    const { comment, rating } = req.body;

    // Build feedback object
    const feedbackFields = {};
    if (comment) feedbackFields.comment = comment;
    if (rating) feedbackFields.rating = rating;

    try {
        let feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }

        // Check user
        if (feedback.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized' });
        }

        feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { $set: feedbackFields },
            { new: true }
        );

        res.json({ success: true, data: feedback });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }

        // Check user
        if (feedback.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized' });
        }

        await feedback.remove();

        res.json({ success: true, message: 'Feedback removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
