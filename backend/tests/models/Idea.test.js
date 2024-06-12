// /backend/tests/models/Idea.test.js

const mongoose = require('mongoose');
const Idea = require('../../api/models/Idea');

describe('Idea Model Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save idea successfully', async () => {
        const validIdea = new Idea({
            title: 'Test Idea',
            description: 'This is a test idea',
            status: 'pending',
            createdBy: mongoose.Types.ObjectId(),
        });
        const savedIdea = await validIdea.save();

        expect(savedIdea._id).toBeDefined();
        expect(savedIdea.title).toBe(validIdea.title);
        expect(savedIdea.description).toBe(validIdea.description);
        expect(savedIdea.status).toBe(validIdea.status);
        expect(savedIdea.createdBy).toBe(validIdea.createdBy);
    });

    it('create idea without required field should fail', async () => {
        const invalidIdea = new Idea({ description: 'Missing required fields' });
        let err;
        try {
            const savedIdeaWithoutRequiredField = await invalidIdea.save();
            err = savedIdeaWithoutRequiredField;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.title).toBeDefined();
    });
});
