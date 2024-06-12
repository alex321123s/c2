// /backend/tests/services/feedbackService.test.js

const mongoose = require('mongoose');
const FeedbackService = require('../../api/services/feedbackService');
const Feedback = require('../../api/models/Feedback');

describe('Feedback Service Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Feedback.deleteMany({});
    });

    it('should add new feedback successfully', async () => {
        const feedbackData = {
            userId: new mongoose.Types.ObjectId(),
            content: 'Great platform with excellent resources!',
            rating: 5,
        };
        const addedFeedback = await FeedbackService.addFeedback(feedbackData);

        expect(addedFeedback._id).toBeDefined();
        expect(addedFeedback.userId).toBe(feedbackData.userId);
        expect(addedFeedback.content).toBe(feedbackData.content);
        expect(addedFeedback.rating).toBe(feedbackData.rating);
    });

    it('should not add feedback without content', async () => {
        const feedbackData = {
            userId: new mongoose.Types.ObjectId(),
            rating: 4,
        };

        try {
            await FeedbackService.addFeedback(feedbackData);
        } catch (error) {
            expect(error.message).toBe('Feedback validation failed: content: Path `content` is required.');
        }
    });

    it('should get feedback by ID', async () => {
        const feedbackData = {
            userId: new mongoose.Types.ObjectId(),
            content: 'Informative and helpful content!',
            rating: 4,
        };
        const addedFeedback = await FeedbackService.addFeedback(feedbackData);
        const fetchedFeedback = await FeedbackService.getFeedbackById(addedFeedback._id);

        expect(fetchedFeedback).toBeDefined();
        expect(fetchedFeedback.content).toBe(feedbackData.content);
        expect(fetchedFeedback.rating).toBe(feedbackData.rating);
    });

    it('should update feedback successfully', async () => {
        const feedbackData = {
            userId: new mongoose.Types.ObjectId(),
            content: 'Good platform!',
            rating: 3,
        };
        const addedFeedback = await FeedbackService.addFeedback(feedbackData);

        const updateData = {
            content: 'Excellent platform with lots of resources!',
            rating: 5,
        };
        const updatedFeedback = await FeedbackService.updateFeedback(addedFeedback._id, updateData);

        expect(updatedFeedback.content).toBe(updateData.content);
        expect(updatedFeedback.rating).toBe(updateData.rating);
    });

    it('should delete feedback successfully', async () => {
        const feedbackData = {
            userId: new mongoose.Types.ObjectId(),
            content: 'Needs improvement.',
            rating: 2,
        };
        const addedFeedback = await FeedbackService.addFeedback(feedbackData);
        await FeedbackService.deleteFeedback(addedFeedback._id);

        const fetchedFeedback = await Feedback.findById(addedFeedback._id);
        expect(fetchedFeedback).toBeNull();
    });
});
