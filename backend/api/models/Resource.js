// /backend/api/models/Resource.js

const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Article', 'Video', 'Tutorial', 'Book', 'Tool', 'Other'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resource', ResourceSchema);
