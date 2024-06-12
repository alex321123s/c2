// /backend/tests/integration/authIntegration.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
    // Connect to the test database
    const url = `mongodb://127.0.0.1/c2_integration_test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Clean up and close the connection
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Auth Integration Tests', () => {

    beforeEach(async () => {
        // Create a test user
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();
    });

    afterEach(async () => {
        // Clean up database
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const newUser = {
            username: 'newuser',
            email: 'newuser@example.com',
            password: 'newpassword'
        };
        const response = await request(app)
            .post('/api/auth/register')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe(newUser.username);
        expect(response.body.email).toBe(newUser.email);
    });

    it('should login an existing user', async () => {
        const loginUser = {
            email: 'test@example.com',
            password: 'password'
        };
        const response = await request(app)
            .post('/api/auth/login')
            .send(loginUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login with wrong credentials', async () => {
        const loginUser = {
            email: 'test@example.com',
            password: 'wrongpassword'
        };
        const response = await request(app)
            .post('/api/auth/login')
            .send(loginUser);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should get the authenticated user', async () => {
        const loginUser = {
            email: 'test@example.com',
            password: 'password'
        };
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(loginUser);

        const token = loginResponse.body.token;

        const response = await request(app)
            .get('/api/auth/user')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe('test@example.com');
    });
});
