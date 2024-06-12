// /frontend/tests/services/event.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../src/services/event';

describe('Event Service', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    it('should fetch events successfully', async () => {
        const response = [{ id: '1', name: 'Event 1' }, { id: '2', name: 'Event 2' }];
        mock.onGet('/api/events').reply(200, response);

        const result = await getEvents();
        
        expect(result).toEqual(response);
    });

    it('should handle error while fetching events', async () => {
        mock.onGet('/api/events').reply(500);

        try {
            await getEvents();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should create an event successfully', async () => {
        const newEvent = { name: 'New Event' };
        const response = { id: '3', name: 'New Event' };
        mock.onPost('/api/events', newEvent).reply(201, response);

        const result = await createEvent(newEvent);
        
        expect(result).toEqual(response);
    });

    it('should handle error while creating an event', async () => {
        const newEvent = { name: 'New Event' };
        mock.onPost('/api/events', newEvent).reply(400);

        try {
            await createEvent(newEvent);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update an event successfully', async () => {
        const eventId = '1';
        const updatedEvent = { name: 'Updated Event' };
        const response = { id: eventId, name: 'Updated Event' };
        mock.onPut(`/api/events/${eventId}`, updatedEvent).reply(200, response);

        const result = await updateEvent(eventId, updatedEvent);
        
        expect(result).toEqual(response);
    });

    it('should handle error while updating an event', async () => {
        const eventId = '1';
        const updatedEvent = { name: 'Updated Event' };
        mock.onPut(`/api/events/${eventId}`, updatedEvent).reply(404);

        try {
            await updateEvent(eventId, updatedEvent);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should delete an event successfully', async () => {
        const eventId = '1';
        mock.onDelete(`/api/events/${eventId}`).reply(204);

        const result = await deleteEvent(eventId);
        
        expect(result).toBeUndefined();
    });

    it('should handle error while deleting an event', async () => {
        const eventId = '1';
        mock.onDelete(`/api/events/${eventId}`).reply(404);

        try {
            await deleteEvent(eventId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
