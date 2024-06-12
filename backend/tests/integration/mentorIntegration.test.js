// /backend/tests/integration/mentorIntegration.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');
const Mentor = require('../../api/models/Mentor');
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

describe('Mentor Integration Tests', () => {

    beforeEach(async () => {
        // Create a test user and mentor
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();

        const mentor = new Mentor({ user: user._id, expertise: 'Software Development', bio: 'Experienced developer' });
        await mentor.save();
    });

    afterEach(async () => {
        // Clean up database
        await User.deleteMany({});
        await Mentor.deleteMany({});
    });

    it('should create a new mentor', async () => {
        const newUser = new User({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' });
        await newUser.save();

        const newMentor = {
            user: newUser._id,
            expertise: 'Data Science',
            bio: 'Expert in data science and AI'
        };

        const response = await request(app)
            .post('/api/mentors')
            .send(newMentor);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.expertise).toBe(newMentor.expertise);
        expect(response.body.bio).toBe(newMentor.bio);
    });

    it('should get a list of mentors', async () => {
        const response = await request(app)
            .get('/api/mentors');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a mentor by ID', async () => {
        const mentor = await Mentor.findOne({}).exec();

        const response = await request(app)
            .get(`/api/mentors/${mentor._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', mentor._id.toString());
        expect(response.body).toHaveProperty('expertise', mentor.expertise);
    });

    it('should update a mentor', async () => {
        const mentor = await Mentor.findOne({}).exec();

        const updatedMentor = {
            expertise: 'Updated Expertise',
            bio: 'Updated bio information'
        };

        const response = await request(app)
            .put(`/api/mentors/${mentor._id}`)
            .send(updatedMentor);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('expertise', updatedMentor.expertise);
        expect(response.body).toHaveProperty('bio', updatedMentor.bio);
    });

    it('should delete a mentor', async () => {
        const mentor = await Mentor.findOne({}).exec();

        const response = await request(app)
            .delete(`/api/mentors/${mentor._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Mentor deleted successfully');
    });
});
