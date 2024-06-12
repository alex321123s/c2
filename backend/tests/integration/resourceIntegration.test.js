// /backend/tests/integration/resourceIntegration.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');
const Resource = require('../../api/models/Resource');
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

describe('Resource Integration Tests', () => {

    beforeEach(async () => {
        // Create a test user and resource
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();

        const resource = new Resource({ 
            title: 'Test Resource', 
            description: 'Resource description', 
            url: 'http://example.com', 
            user: user._id 
        });
        await resource.save();
    });

    afterEach(async () => {
        // Clean up database
        await User.deleteMany({});
        await Resource.deleteMany({});
    });

    it('should create a new resource', async () => {
        const newUser = new User({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' });
        await newUser.save();

        const newResource = {
            title: 'New Resource',
            description: 'New resource description',
            url: 'http://newresource.com',
            user: newUser._id
        };

        const response = await request(app)
            .post('/api/resources')
            .send(newResource);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(newResource.title);
        expect(response.body.description).toBe(newResource.description);
    });

    it('should get a list of resources', async () => {
        const response = await request(app)
            .get('/api/resources');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a resource by ID', async () => {
        const resource = await Resource.findOne({}).exec();

        const response = await request(app)
            .get(`/api/resources/${resource._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', resource._id.toString());
        expect(response.body).toHaveProperty('title', resource.title);
    });

    it('should update a resource', async () => {
        const resource = await Resource.findOne({}).exec();

        const updatedResource = {
            title: 'Updated Resource',
            description: 'Updated resource description'
        };

        const response = await request(app)
            .put(`/api/resources/${resource._id}`)
            .send(updatedResource);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', updatedResource.title);
        expect(response.body).toHaveProperty('description', updatedResource.description);
    });

    it('should delete a resource', async () => {
        const resource = await Resource.findOne({}).exec();

        const response = await request(app)
            .delete(`/api/resources/${resource._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Resource deleted successfully');
    });
});
