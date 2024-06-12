// /backend/tests/controllers/userController.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');

// Mock data for testing
const mockUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123"
};

describe('User Controller Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({}); // Clear the database before running tests
    });

    afterAll(async () => {
        await User.deleteMany({}); // Clear the database after tests
    });

    test('Should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(mockUser)
            .expect(201);
        
        expect(response.body.name).toBe(mockUser.name);
        expect(response.body.email).toBe(mockUser.email);
    });

    test('Should fetch all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);
        
        expect(response.body.length).toBe(1);
    });

    test('Should fetch a single user by ID', async () => {
        const user = await User.findOne({ email: mockUser.email });
        const response = await request(app)
            .get(`/api/users/${user._id}`)
            .expect(200);
        
        expect(response.body.name).toBe(mockUser.name);
        expect(response.body.email).toBe(mockUser.email);
    });

    test('Should update a user', async () => {
        const user = await User.findOne({ email: mockUser.email });
        const updatedUser = { name: "Updated Test User" };

        const response = await request(app)
            .put(`/api/users/${user._id}`)
            .send(updatedUser)
            .expect(200);
        
        expect(response.body.name).toBe(updatedUser.name);
    });

    test('Should delete a user', async () => {
        const user = await User.findOne({ email: mockUser.email });

        await request(app)
            .delete(`/api/users/${user._id}`)
            .expect(200);
        
        const deletedUser = await User.findById(user._id);
        expect(deletedUser).toBeNull();
    });
});
