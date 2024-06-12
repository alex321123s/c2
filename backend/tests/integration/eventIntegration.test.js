// /backend/tests/integration/eventIntegration.test.js

const request = require('supertest');
const app = require('../../app');
const User = require('../../api/models/User');
const Event = require('../../api/models/Event');
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

describe('Event Integration Tests', () => {

    beforeEach(async () => {
        // Create a test user and event
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();

        const event = new Event({ 
            title: 'Test Event', 
            description: 'Event description', 
            date: new Date(), 
            location: 'Virtual', 
            user: user._id 
        });
        await event.save();
    });

    afterEach(async () => {
        // Clean up database
        await User.deleteMany({});
        await Event.deleteMany({});
    });

    it('should create a new event', async () => {
        const newUser = new User({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' });
        await newUser.save();

        const newEvent = {
            title: 'New Event',
            description: 'New event description',
            date: new Date(),
            location: 'Virtual',
            user: newUser._id
        };

        const response = await request(app)
            .post('/api/events')
            .send(newEvent);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(newEvent.title);
        expect(response.body.description).toBe(newEvent.description);
    });

    it('should get a list of events', async () => {
        const response = await request(app)
            .get('/api/events');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get an event by ID', async () => {
        const event = await Event.findOne({}).exec();

        const response = await request(app)
            .get(`/api/events/${event._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', event._id.toString());
        expect(response.body).toHaveProperty('title', event.title);
    });

    it('should update an event', async () => {
        const event = await Event.findOne({}).exec();

        const updatedEvent = {
            title: 'Updated Event',
            description: 'Updated event description'
        };

        const response = await request(app)
            .put(`/api/events/${event._id}`)
            .send(updatedEvent);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', updatedEvent.title);
        expect(response.body).toHaveProperty('description', updatedEvent.description);
    });

    it('should delete an event', async () => {
        const event = await Event.findOne({}).exec();

        const response = await request(app)
            .delete(`/api/events/${event._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Event deleted successfully');
    });
});
