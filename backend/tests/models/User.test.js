// /backend/tests/models/User.test.js

const mongoose = require('mongoose');
const User = require('../../api/models/User');

describe('User Model Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save user successfully', async () => {
        const validUser = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'Password123!',
            role: 'user'
        });
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(validUser.username);
        expect(savedUser.email).toBe(validUser.email);
        expect(savedUser.password).toBe(validUser.password); // Note: In a real scenario, passwords are hashed.
        expect(savedUser.role).toBe(validUser.role);
    });

    it('create user without required field should fail', async () => {
        const invalidUser = new User({ email: 'testuser@example.com' });
        let err;
        try {
            const savedUserWithoutRequiredField = await invalidUser.save();
            err = savedUserWithoutRequiredField;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
    });
});
