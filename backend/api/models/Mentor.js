// /backend/api/models/Mentor.js

const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expertise: {
        type: [String],
        required: true
    },
    availability: {
        type: String,
        enum: ['full-time', 'part-time', 'consulting'],
        default: 'part-time'
    },
    bio: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            review: String,
            rating: {
                type: Number,
                min: 0,
                max: 5
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Mentor', MentorSchema);
