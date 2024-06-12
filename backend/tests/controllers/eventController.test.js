// /backend/tests/controllers/eventController.test.js

const request = require('supertest');
const app = require('../../app');
const Event = require('../../api/models/Event');
const User = require('../../api/models/User');

// Mock data for testing
const mockUser = {
    name: "Event User",
    email: "eventuser@example.com",
    password: "password123"
};

const mockEvent = {
    title: "Tech Conference",
    description: "A conference about the latest in tech.",
    date: "2024-06-15",
    location: "Berlin"
};

let token;

describe('Event Controller Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        await Event.deleteMany({});
        const response = await request(app)
            .post('/api/auth/register')
            .send(mockUser)
            .expect(201);
        token = response.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Event.deleteMany({});
    });

    test('Should create a new event', async () => {
        const response = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send(mockEvent)
            .expect(201);

        expect(response.body.title).toBe(mockEvent.title);
        expect(response.body.description).toBe(mockEvent.description);
        expect(response.body.date).toBe(mockEvent.date);
        expect(response.body.location).toBe(mockEvent.location);
    });

    test('Should get a list of events', async () => {
        await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send(mockEvent)
            .expect(201);

        const response = await request(app)
            .get('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should get a single event by ID', async () => {
        const eventResponse = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send(mockEvent)
            .expect(201);

        const eventId = eventResponse.body._id;

        const response = await request(app)
            .get(`/api/events/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.title).toBe(mockEvent.title);
        expect(response.body.description).toBe(mockEvent.description);
    });

    test('Should update an event by ID', async () => {
        const eventResponse = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send(mockEvent)
            .expect(201);

        const eventId = eventResponse.body._id;
        const updatedEvent = {
            title: "Updated Tech Conference",
            description: "An updated description.",
            date: "2024-07-20",
            location: "Munich"
        };

        const response = await request(app)
            .put(`/api/events/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedEvent)
            .expect(200);

        expect(response.body.title).toBe(updatedEvent.title);
        expect(response.body.description).toBe(updatedEvent.description);
        expect(response.body.date).toBe(updatedEvent.date);
        expect(response.body.location).toBe(updatedEvent.location);
    });

    test('Should delete an event by ID', async () => {
        const eventResponse = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send(mockEvent)
            .expect(201);

        const eventId = eventResponse.body._id;

        await request(app)
            .delete(`/api/events/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const response = await request(app)
            .get(`/api/events/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body.message).toBe('Event not found');
    });
});
