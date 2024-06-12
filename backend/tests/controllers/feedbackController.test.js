// /backend/tests/controllers/feedbackController.test.js

const request = require('supertest');
const app = require('../../app');
const Feedback = require('../../api/models/Feedback');
const User = require('../../api/models/User');

// Mock data for testing
const mockUser = {
    name: "Feedback User",
    email: "feedbackuser@example.com",
    password: "password123"
};

const mockFeedback = {
    content: "This is a feedback message.",
    rating: 5
};

let token;

describe('Feedback Controller Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        await Feedback.deleteMany({});
        const response = await request(app)
            .post('/api/auth/register')
            .send(mockUser)
            .expect(201);
        token = response.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Feedback.deleteMany({});
    });

    test('Should create a new feedback', async () => {
        const response = await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFeedback)
            .expect(201);

        expect(response.body.content).toBe(mockFeedback.content);
        expect(response.body.rating).toBe(mockFeedback.rating);
    });

    test('Should get a list of feedbacks', async () => {
        await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFeedback)
            .expect(201);

        const response = await request(app)
            .get('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should get a single feedback by ID', async () => {
        const feedbackResponse = await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFeedback)
            .expect(201);

        const feedbackId = feedbackResponse.body._id;

        const response = await request(app)
            .get(`/api/feedback/${feedbackId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.content).toBe(mockFeedback.content);
        expect(response.body.rating).toBe(mockFeedback.rating);
    });

    test('Should update a feedback by ID', async () => {
        const feedbackResponse = await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFeedback)
            .expect(201);

        const feedbackId = feedbackResponse.body._id;
        const updatedFeedback = {
            content: "Updated feedback message.",
            rating: 4
        };

        const response = await request(app)
            .put(`/api/feedback/${feedbackId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedFeedback)
            .expect(200);

        expect(response.body.content).toBe(updatedFeedback.content);
        expect(response.body.rating).toBe(updatedFeedback.rating);
    });

    test('Should delete a feedback by ID', async () => {
        const feedbackResponse = await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFeedback)
            .expect(201);

        const feedbackId = feedbackResponse.body._id;

        await request(app)
            .delete(`/api/feedback/${feedbackId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const response = await request(app)
            .get(`/api/feedback/${feedbackId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body.message).toBe('Feedback not found');
    });
});
