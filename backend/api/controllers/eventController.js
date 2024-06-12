// /backend/api/controllers/eventController.js

const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// @desc    Get list of all events
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ success: true, data: events });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        res.json({ success: true, data: event });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, date, location } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            user: req.user.id
        });

        const event = await newEvent.save();
        res.json({ success: true, data: event });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res) => {
    const { title, description, date, location } = req.body;

    // Build event object
    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (date) eventFields.date = date;
    if (location) eventFields.location = location;

    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        // Check user
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized' });
        }

        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: eventFields },
            { new: true }
        );

        res.json({ success: true, data: event });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        // Check user
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized' });
        }

        await event.remove();

        res.json({ success: true, message: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
