// /backend/tests/models/Event.test.js

const mongoose = require('mongoose');
const Event = require('../../api/models/Event');

describe('Event Model Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save event successfully', async () => {
        const validEvent = new Event({
            title: 'Innovation Workshop',
            description: 'A workshop to foster innovation',
            date: new Date(),
            location: 'Virtual'
        });
        const savedEvent = await validEvent.save();

        expect(savedEvent._id).toBeDefined();
        expect(savedEvent.title).toBe(validEvent.title);
        expect(savedEvent.description).toBe(validEvent.description);
        expect(savedEvent.date).toEqual(validEvent.date);
        expect(savedEvent.location).toBe(validEvent.location);
    });

    it('create event without required field should fail', async () => {
        const invalidEvent = new Event({ description: 'A workshop to foster innovation' });
        let err;
        try {
            const savedEventWithoutRequiredField = await invalidEvent.save();
            err = savedEventWithoutRequiredField;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.title).toBeDefined();
        expect(err.errors.date).toBeDefined();
        expect(err.errors.location).toBeDefined();
    });
});
