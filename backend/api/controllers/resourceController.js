// /backend/api/controllers/resourceController.js

const Resource = require('../models/Resource');
const { validationResult } = require('express-validator');

// @desc    Get list of all resources
// @route   GET /api/resources
// @access  Public
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json({ success: true, data: resources });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single resource by ID
// @route   GET /api/resources/:id
// @access  Public
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ success: false, error: 'Resource not found' });
        }

        res.json({ success: true, data: resource });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Resource not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Private
exports.createResource = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, content, author } = req.body;

    try {
        const newResource = new Resource({
            title,
            description,
            content,
            author: req.user.id
        });

        const resource = await newResource.save();
        res.json({ success: true, data: resource });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private
exports.updateResource = async (req, res) => {
    const { title, description, content } = req.body;

    // Build resource object
    const resourceFields = {};
    if (title) resourceFields.title = title;
    if (description) resourceFields.description = description;
    if (content) resourceFields.content = content;

    try {
        let resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ success: false, error: 'Resource not found' });
        }

        // Check user
        if (resource.author.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized' });
        }

        resource = await Resource.findByIdAndUpdate(
            req.params.id,
            { $set: resourceFields },
            { new: true }
        );

        res.json({ success: true, data: resource });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ success: false, error: 'Resource not found' });
        }

        // Check user
        if (resource.author.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized' });
        }

        await resource.remove();

        res.json({ success: true, message: 'Resource removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
