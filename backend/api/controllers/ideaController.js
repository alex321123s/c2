// /backend/api/controllers/ideaController.js

const Idea = require('../models/Idea');
const { validationResult } = require('express-validator');

// @desc    Get all ideas
// @route   GET /api/ideas
// @access  Public
exports.getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.status(200).json({ success: true, data: ideas });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single idea
// @route   GET /api/ideas/:id
// @access  Public
exports.getIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({ success: false, error: 'Idea not found' });
        }

        res.status(200).json({ success: true, data: idea });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new idea
// @route   POST /api/ideas
// @access  Private
exports.createIdea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const idea = await Idea.create(req.body);
        res.status(201).json({ success: true, data: idea });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Private
exports.updateIdea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!idea) {
            return res.status(404).json({ success: false, error: 'Idea not found' });
        }

        res.status(200).json({ success: true, data: idea });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete idea
// @route   DELETE /api/ideas/:id
// @access  Private
exports.deleteIdea = async (req, res) => {
    try {
        const idea = await Idea.findByIdAndDelete(req.params.id);

        if (!idea) {
            return res.status(404).json({ success: false, error: 'Idea not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
