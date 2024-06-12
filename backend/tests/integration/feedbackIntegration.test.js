// /backend/tests/integration/feedbackIntegration.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');
const Feedback = require('../../api/models/Feedback');
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

describe('Feedback Integration Tests', () => {

    beforeEach(async () => {
        // Create a test user and feedback
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();

        const feedback = new Feedback({ 
            user: user._id, 
            feedbackText: 'This is a test feedback', 
            rating: 5 
        });
        await feedback.save();
    });

    afterEach(async () => {
        // Clean up database
        await User.deleteMany({});
        await Feedback.deleteMany({});
    });

    it('should create a new feedback', async () => {
        const newUser = new User({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' });
        await newUser.save();

        const newFeedback = {
            user: newUser._id,
            feedbackText: 'This is a new feedback',
            rating: 4
        };

        const response = await request(app)
            .post('/api/feedbacks')
            .send(newFeedback);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.feedbackText).toBe(newFeedback.feedbackText);
        expect(response.body.rating).toBe(newFeedback.rating);
    });

    it('should get a list of feedbacks', async () => {
        const response = await request(app)
            .get('/api/feedbacks');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get feedback by ID', async () => {
        const feedback = await Feedback.findOne({}).exec();

        const response = await request(app)
            .get(`/api/feedbacks/${feedback._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', feedback._id.toString());
        expect(response.body).toHaveProperty('feedbackText', feedback.feedbackText);
    });

    it('should update feedback', async () => {
        const feedback = await Feedback.findOne({}).exec();

        const updatedFeedback = {
            feedbackText: 'Updated feedback text',
            rating: 3
        };

        const response = await request(app)
            .put(`/api/feedbacks/${feedback._id}`)
            .send(updatedFeedback);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('feedbackText', updatedFeedback.feedbackText);
        expect(response.body).toHaveProperty('rating', updatedFeedback.rating);
    });

    it('should delete feedback', async () => {
        const feedback = await Feedback.findOne({}).exec();

        const response = await request(app)
            .delete(`/api/feedbacks/${feedback._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Feedback deleted successfully');
    });
});
