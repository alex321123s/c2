// /frontend/tests/integration/eventCalendarIntegration.test.js

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import EventCalendar from '../../src/components/EventCalendar';
import api from '../../src/services/api';

jest.mock('../../src/services/api');

describe('Event Calendar Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display events on the calendar', async () => {
        const mockEvents = {
            data: [
                {
                    id: 1,
                    title: 'Event 1',
                    date: '2023-05-01T00:00:00Z',
                    description: 'Description of Event 1',
                },
                {
                    id: 2,
                    title: 'Event 2',
                    date: '2023-05-05T00:00:00Z',
                    description: 'Description of Event 2',
                },
            ],
        };
        api.get.mockResolvedValueOnce(mockEvents);

        render(
            <Router>
                <EventCalendar />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/events');
        });

        expect(screen.getByText(/event 1/i)).toBeInTheDocument();
        expect(screen.getByText(/event 2/i)).toBeInTheDocument();
    });

    it('should handle error when fetching events', async () => {
        api.get.mockRejectedValueOnce(new Error('Failed to fetch events'));

        render(
            <Router>
                <EventCalendar />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/events');
        });

        expect(screen.getByText(/failed to fetch events/i)).toBeInTheDocument();
    });

    it('should create a new event and display it on the calendar', async () => {
        const newEvent = {
            id: 3,
            title: 'New Event',
            date: '2023-05-10T00:00:00Z',
            description: 'Description of New Event',
        };

        api.post.mockResolvedValueOnce({ data: newEvent });

        render(
            <Router>
                <EventCalendar />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Event' } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-05-10' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description of New Event' } });
        fireEvent.click(screen.getByRole('button', { name: /add event/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/events', {
                title: 'New Event',
                date: '2023-05-10T00:00:00Z',
                description: 'Description of New Event',
            });
        });

        expect(screen.getByText(/new event/i)).toBeInTheDocument();
    });

    it('should handle error when creating a new event', async () => {
        api.post.mockRejectedValueOnce(new Error('Failed to create event'));

        render(
            <Router>
                <EventCalendar />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Event' } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-05-10' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description of New Event' } });
        fireEvent.click(screen.getByRole('button', { name: /add event/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/events', {
                title: 'New Event',
                date: '2023-05-10T00:00:00Z',
                description: 'Description of New Event',
            });
        });

        expect(screen.getByText(/failed to create event/i)).toBeInTheDocument();
    });
});
