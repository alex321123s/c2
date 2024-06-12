// /backend/tests/controllers/ideaController.test.js

const request = require('supertest');
const app = require('../../app');
const Idea = require('../../api/models/Idea');

// Mock data for testing
const mockIdea = {
    title: "Test Idea",
    description: "This is a test idea",
    user: "1234567890abcdef12345678"
};

describe('Idea Controller Tests', () => {
    beforeAll(async () => {
        await Idea.deleteMany({}); // Clear the database before running tests
    });

    afterAll(async () => {
        await Idea.deleteMany({}); // Clear the database after tests
    });

    test('Should create a new idea', async () => {
        const response = await request(app)
            .post('/api/ideas')
            .send(mockIdea)
            .expect(201);
        
        expect(response.body.title).toBe(mockIdea.title);
        expect(response.body.description).toBe(mockIdea.description);
    });

    test('Should fetch all ideas', async () => {
        const response = await request(app)
            .get('/api/ideas')
            .expect(200);
        
        expect(response.body.length).toBe(1);
    });

    test('Should fetch a single idea by ID', async () => {
        const idea = await Idea.findOne({ title: mockIdea.title });
        const response = await request(app)
            .get(`/api/ideas/${idea._id}`)
            .expect(200);
        
        expect(response.body.title).toBe(mockIdea.title);
        expect(response.body.description).toBe(mockIdea.description);
    });

    test('Should update an idea', async () => {
        const idea = await Idea.findOne({ title: mockIdea.title });
        const updatedIdea = { title: "Updated Test Idea" };

        const response = await request(app)
            .put(`/api/ideas/${idea._id}`)
            .send(updatedIdea)
            .expect(200);
        
        expect(response.body.title).toBe(updatedIdea.title);
    });

    test('Should delete an idea', async () => {
        const idea = await Idea.findOne({ title: mockIdea.title });

        await request(app)
            .delete(`/api/ideas/${idea._id}`)
            .expect(200);
        
        const deletedIdea = await Idea.findById(idea._id);
        expect(deletedIdea).toBeNull();
    });
});
