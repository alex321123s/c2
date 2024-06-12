// /backend/tests/controllers/mentorController.test.js

const request = require('supertest');
const app = require('../../app');
const Mentor = require('../../api/models/Mentor');
const User = require('../../api/models/User');

// Mock data for testing
const mockUser = {
    name: "Mentor User",
    email: "mentoruser@example.com",
    password: "password123"
};

const mockMentor = {
    name: "John Doe",
    expertise: "Software Development",
    availability: "Weekdays"
};

let token;

describe('Mentor Controller Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        await Mentor.deleteMany({});
        const response = await request(app)
            .post('/api/auth/register')
            .send(mockUser)
            .expect(201);
        token = response.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Mentor.deleteMany({});
    });

    test('Should create a new mentor', async () => {
        const response = await request(app)
            .post('/api/mentors')
            .set('Authorization', `Bearer ${token}`)
            .send(mockMentor)
            .expect(201);

        expect(response.body.name).toBe(mockMentor.name);
        expect(response.body.expertise).toBe(mockMentor.expertise);
    });

    test('Should get a list of mentors', async () => {
        await request(app)
            .post('/api/mentors')
            .set('Authorization', `Bearer ${token}`)
            .send(mockMentor)
            .expect(201);

        const response = await request(app)
            .get('/api/mentors')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should get a single mentor by ID', async () => {
        const mentorResponse = await request(app)
            .post('/api/mentors')
            .set('Authorization', `Bearer ${token}`)
            .send(mockMentor)
            .expect(201);

        const mentorId = mentorResponse.body._id;

        const response = await request(app)
            .get(`/api/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.name).toBe(mockMentor.name);
        expect(response.body.expertise).toBe(mockMentor.expertise);
    });

    test('Should update a mentor by ID', async () => {
        const mentorResponse = await request(app)
            .post('/api/mentors')
            .set('Authorization', `Bearer ${token}`)
            .send(mockMentor)
            .expect(201);

        const mentorId = mentorResponse.body._id;
        const updatedMentor = {
            name: "Jane Doe",
            expertise: "Data Science"
        };

        const response = await request(app)
            .put(`/api/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedMentor)
            .expect(200);

        expect(response.body.name).toBe(updatedMentor.name);
        expect(response.body.expertise).toBe(updatedMentor.expertise);
    });

    test('Should delete a mentor by ID', async () => {
        const mentorResponse = await request(app)
            .post('/api/mentors')
            .set('Authorization', `Bearer ${token}`)
            .send(mockMentor)
            .expect(201);

        const mentorId = mentorResponse.body._id;

        await request(app)
            .delete(`/api/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const response = await request(app)
            .get(`/api/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body.message).toBe('Mentor not found');
    });
});
