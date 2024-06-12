// /backend/tests/services/eventService.test.js

const mongoose = require('mongoose');
const EventService = require('../../api/services/eventService');
const Event = require('../../api/models/Event');

describe('Event Service Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Event.deleteMany({});
    });

    it('should add a new event successfully', async () => {
        const eventData = {
            title: 'Hackathon 2023',
            description: 'Annual hackathon event.',
            date: new Date(),
            location: 'Berlin',
        };
        const addedEvent = await EventService.addEvent(eventData);

        expect(addedEvent._id).toBeDefined();
        expect(addedEvent.title).toBe(eventData.title);
        expect(addedEvent.description).toBe(eventData.description);
        expect(addedEvent.date).toEqual(eventData.date);
        expect(addedEvent.location).toBe(eventData.location);
    });

    it('should not add an event without a title', async () => {
        const eventData = {
            description: 'Annual hackathon event.',
            date: new Date(),
            location: 'Berlin',
        };

        try {
            await EventService.addEvent(eventData);
        } catch (error) {
            expect(error.message).toBe('Event validation failed: title: Path `title` is required.');
        }
    });

    it('should get an event by ID', async () => {
        const eventData = {
            title: 'Hackathon 2023',
            description: 'Annual hackathon event.',
            date: new Date(),
            location: 'Berlin',
        };
        const addedEvent = await EventService.addEvent(eventData);
        const fetchedEvent = await EventService.getEventById(addedEvent._id);

        expect(fetchedEvent).toBeDefined();
        expect(fetchedEvent.title).toBe(eventData.title);
        expect(fetchedEvent.description).toBe(eventData.description);
        expect(fetchedEvent.date).toEqual(eventData.date);
        expect(fetchedEvent.location).toBe(eventData.location);
    });

    it('should update an event successfully', async () => {
        const eventData = {
            title: 'Hackathon 2023',
            description: 'Annual hackathon event.',
            date: new Date(),
            location: 'Berlin',
        };
        const addedEvent = await EventService.addEvent(eventData);

        const updateData = {
            title: 'Hackathon 2024',
            location: 'Munich',
        };
        const updatedEvent = await EventService.updateEvent(addedEvent._id, updateData);

        expect(updatedEvent.title).toBe(updateData.title);
        expect(updatedEvent.location).toBe(updateData.location);
    });

    it('should delete an event successfully', async () => {
        const eventData = {
            title: 'Hackathon 2023',
            description: 'Annual hackathon event.',
            date: new Date(),
            location: 'Berlin',
        };
        const addedEvent = await EventService.addEvent(eventData);
        await EventService.deleteEvent(addedEvent._id);

        const fetchedEvent = await Event.findById(addedEvent._id);
        expect(fetchedEvent).toBeNull();
    });
});
