// /backend/api/controllers/mentorController.js

const Mentor = require('../models/Mentor');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get list of all mentors
// @route   GET /api/mentors
// @access  Public
exports.getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find().populate('user', ['name', 'email']);
        res.json({ success: true, data: mentors });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single mentor by ID
// @route   GET /api/mentors/:id
// @access  Public
exports.getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id).populate('user', ['name', 'email']);

        if (!mentor) {
            return res.status(404).json({ success: false, error: 'Mentor not found' });
        }

        res.json({ success: true, data: mentor });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Mentor not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create or update a mentor profile
// @route   POST /api/mentors
// @access  Private
exports.createOrUpdateMentorProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { bio, expertise, availability } = req.body;

    // Build mentor object
    const mentorFields = {};
    mentorFields.user = req.user.id;
    if (bio) mentorFields.bio = bio;
    if (expertise) mentorFields.expertise = expertise;
    if (availability) mentorFields.availability = availability;

    try {
        let mentor = await Mentor.findOne({ user: req.user.id });

        if (mentor) {
            // Update
            mentor = await Mentor.findOneAndUpdate(
                { user: req.user.id },
                { $set: mentorFields },
                { new: true }
            );
            return res.json({ success: true, data: mentor });
        }

        // Create
        mentor = new Mentor(mentorFields);
        await mentor.save();
        res.json({ success: true, data: mentor });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete mentor profile
// @route   DELETE /api/mentors/:id
// @access  Private
exports.deleteMentorProfile = async (req, res) => {
    try {
        await Mentor.findOneAndRemove({ user: req.user.id });
        res.json({ success: true, message: 'Mentor profile removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
