// /backend/tests/models/Feedback.test.js

const mongoose = require('mongoose');
const Feedback = require('../../api/models/Feedback');

describe('Feedback Model Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save feedback successfully', async () => {
        const validFeedback = new Feedback({
            userId: mongoose.Types.ObjectId(),
            content: 'This is a feedback message',
            rating: 5
        });
        const savedFeedback = await validFeedback.save();

        expect(savedFeedback._id).toBeDefined();
        expect(savedFeedback.userId).toBe(validFeedback.userId);
        expect(savedFeedback.content).toBe(validFeedback.content);
        expect(savedFeedback.rating).toBe(validFeedback.rating);
    });

    it('create feedback without required field should fail', async () => {
        const invalidFeedback = new Feedback({ content: 'This is a feedback message' });
        let err;
        try {
            const savedFeedbackWithoutRequiredField = await invalidFeedback.save();
            err = savedFeedbackWithoutRequiredField;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.rating).toBeDefined();
    });
});
