// /backend/tests/controllers/authController.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');

// Mock data for testing
const mockUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123"
};

let token;

describe('Auth Controller Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        const response = await request(app)
            .post('/api/auth/register')
            .send(mockUser)
            .expect(201);
        token = response.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    test('Should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: "New User",
                email: "newuser@example.com",
                password: "password123"
            })
            .expect(201);
        
        expect(response.body.token).toBeDefined();
    });

    test('Should login an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: mockUser.email,
                password: mockUser.password
            })
            .expect(200);
        
        expect(response.body.token).toBeDefined();
    });

    test('Should fail to login with wrong password', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                email: mockUser.email,
                password: "wrongpassword"
            })
            .expect(401);
    });

    test('Should get user profile with valid token', async () => {
        const response = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        
        expect(response.body.email).toBe(mockUser.email);
    });

    test('Should fail to get user profile with invalid token', async () => {
        await request(app)
            .get('/api/auth/me')
            .set('Authorization', 'Bearer invalidtoken')
            .expect(401);
    });
});
