// /backend/tests/models/Mentor.test.js

const mongoose = require('mongoose');
const Mentor = require('../../api/models/Mentor');

describe('Mentor Model Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save mentor successfully', async () => {
        const validMentor = new Mentor({
            name: 'John Doe',
            email: 'johndoe@example.com',
            expertise: 'Software Development',
            availability: '10 hours/week'
        });
        const savedMentor = await validMentor.save();

        expect(savedMentor._id).toBeDefined();
        expect(savedMentor.name).toBe(validMentor.name);
        expect(savedMentor.email).toBe(validMentor.email);
        expect(savedMentor.expertise).toBe(validMentor.expertise);
        expect(savedMentor.availability).toBe(validMentor.availability);
    });

    it('create mentor without required field should fail', async () => {
        const invalidMentor = new Mentor({ email: 'johndoe@example.com' });
        let err;
        try {
            const savedMentorWithoutRequiredField = await invalidMentor.save();
            err = savedMentorWithoutRequiredField;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
        expect(err.errors.expertise).toBeDefined();
        expect(err.errors.availability).toBeDefined();
    });
});
