// /backend/tests/controllers/resourceController.test.js

const request = require('supertest');
const app = require('../../app');
const Resource = require('../../api/models/Resource');
const User = require('../../api/models/User');

// Mock data for testing
const mockUser = {
    name: "Resource User",
    email: "resourceuser@example.com",
    password: "password123"
};

const mockResource = {
    title: "JavaScript Guide",
    description: "Comprehensive guide to JavaScript.",
    link: "http://example.com/js-guide",
    type: "article"
};

let token;

describe('Resource Controller Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        await Resource.deleteMany({});
        const response = await request(app)
            .post('/api/auth/register')
            .send(mockUser)
            .expect(201);
        token = response.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Resource.deleteMany({});
    });

    test('Should create a new resource', async () => {
        const response = await request(app)
            .post('/api/resources')
            .set('Authorization', `Bearer ${token}`)
            .send(mockResource)
            .expect(201);

        expect(response.body.title).toBe(mockResource.title);
        expect(response.body.description).toBe(mockResource.description);
        expect(response.body.link).toBe(mockResource.link);
        expect(response.body.type).toBe(mockResource.type);
    });

    test('Should get a list of resources', async () => {
        await request(app)
            .post('/api/resources')
            .set('Authorization', `Bearer ${token}`)
            .send(mockResource)
            .expect(201);

        const response = await request(app)
            .get('/api/resources')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should get a single resource by ID', async () => {
        const resourceResponse = await request(app)
            .post('/api/resources')
            .set('Authorization', `Bearer ${token}`)
            .send(mockResource)
            .expect(201);

        const resourceId = resourceResponse.body._id;

        const response = await request(app)
            .get(`/api/resources/${resourceId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.title).toBe(mockResource.title);
        expect(response.body.description).toBe(mockResource.description);
    });

    test('Should update a resource by ID', async () => {
        const resourceResponse = await request(app)
            .post('/api/resources')
            .set('Authorization', `Bearer ${token}`)
            .send(mockResource)
            .expect(201);

        const resourceId = resourceResponse.body._id;
        const updatedResource = {
            title: "Updated JavaScript Guide",
            description: "An updated comprehensive guide to JavaScript.",
            link: "http://example.com/updated-js-guide",
            type: "article"
        };

        const response = await request(app)
            .put(`/api/resources/${resourceId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedResource)
            .expect(200);

        expect(response.body.title).toBe(updatedResource.title);
        expect(response.body.description).toBe(updatedResource.description);
        expect(response.body.link).toBe(updatedResource.link);
        expect(response.body.type).toBe(updatedResource.type);
    });

    test('Should delete a resource by ID', async () => {
        const resourceResponse = await request(app)
            .post('/api/resources')
            .set('Authorization', `Bearer ${token}`)
            .send(mockResource)
            .expect(201);

        const resourceId = resourceResponse.body._id;

        await request(app)
            .delete(`/api/resources/${resourceId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const response = await request(app)
            .get(`/api/resources/${resourceId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body.message).toBe('Resource not found');
    });
});
