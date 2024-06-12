// /backend/tests/integration/ideaIntegration.test.js

const request = require('supertest');
const app = require('../../app');
const Idea = require('../../api/models/Idea');
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

describe('Idea Integration Tests', () => {
    
    let token;
    beforeEach(async () => {
        // Create a test user and get a JWT token
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();
        const response = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password' });
        token = response.body.token;
    });

    afterEach(async () => {
        // Clean up database
        await Idea.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a new idea', async () => {
        const newIdea = {
            title: 'New Idea',
            description: 'This is a new idea.',
            category: 'Tech'
        };
        const response = await request(app)
            .post('/api/ideas')
            .set('Authorization', `Bearer ${token}`)
            .send(newIdea);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(newIdea.title);
        expect(response.body.description).toBe(newIdea.description);
        expect(response.body.category).toBe(newIdea.category);
    });

    it('should get a list of ideas', async () => {
        const response = await request(app)
            .get('/api/ideas')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update an existing idea', async () => {
        const idea = new Idea({ title: 'Existing Idea', description: 'This is an existing idea.', category: 'Health' });
        await idea.save();

        const updatedIdea = {
            title: 'Updated Idea',
            description: 'This is an updated idea.',
            category: 'Education'
        };
        const response = await request(app)
            .put(`/api/ideas/${idea._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedIdea);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedIdea.title);
        expect(response.body.description).toBe(updatedIdea.description);
        expect(response.body.category).toBe(updatedIdea.category);
    });

    it('should delete an existing idea', async () => {
        const idea = new Idea({ title: 'To Be Deleted', description: 'This idea will be deleted.', category: 'Environment' });
        await idea.save();

        const response = await request(app)
            .delete(`/api/ideas/${idea._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Idea deleted successfully');
    });
});
