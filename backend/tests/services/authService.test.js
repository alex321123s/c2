// /backend/tests/services/authService.test.js

const mongoose = require('mongoose');
const AuthService = require('../../api/services/authService');
const User = require('../../api/models/User');

describe('Auth Service Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user successfully', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };
        const registeredUser = await AuthService.registerUser(userData);

        expect(registeredUser._id).toBeDefined();
        expect(registeredUser.username).toBe(userData.username);
        expect(registeredUser.email).toBe(userData.email);
    });

    it('should not register a user with existing email', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };
        await AuthService.registerUser(userData);

        try {
            await AuthService.registerUser(userData);
        } catch (error) {
            expect(error.message).toBe('User with this email already exists');
        }
    });

    it('should authenticate user with correct credentials', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };
        await AuthService.registerUser(userData);

        const authData = {
            email: 'testuser@example.com',
            password: 'password123'
        };
        const authenticatedUser = await AuthService.authenticateUser(authData);

        expect(authenticatedUser).toBeDefined();
        expect(authenticatedUser.email).toBe(userData.email);
    });

    it('should not authenticate user with incorrect credentials', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };
        await AuthService.registerUser(userData);

        const authData = {
            email: 'testuser@example.com',
            password: 'wrongpassword'
        };
        try {
            await AuthService.authenticateUser(authData);
        } catch (error) {
            expect(error.message).toBe('Invalid email or password');
        }
    });

    it('should generate JWT token for authenticated user', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };
        await AuthService.registerUser(userData);

        const authData = {
            email: 'testuser@example.com',
            password: 'password123'
        };
        const token = await AuthService.login(authData);

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });
});
