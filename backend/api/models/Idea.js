// /backend/api/models/Idea.js

const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['submitted', 'in review', 'approved', 'rejected', 'in development', 'completed'],
        default: 'submitted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    feedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
});

IdeaSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Idea', IdeaSchema);
