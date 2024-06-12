// /frontend/tests/pages/EventPage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventPage from '../../src/pages/EventPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('EventPage Component', () => {
    it('should render the EventPage with a list of events', () => {
        render(
            <Router>
                <EventPage />
            </Router>
        );

        // Check for the presence of event list elements
        expect(screen.getByTestId('event-list')).toBeInTheDocument();
        expect(screen.getAllByTestId('event-item').length).toBeGreaterThan(0);
    });

    it('should allow filtering events by date', () => {
        render(
            <Router>
                <EventPage />
            </Router>
        );

        // Simulate selecting a filter option
        fireEvent.change(screen.getByLabelText(/Filter by Date/i), { target: { value: '2023-12-25' } });

        // Check if the list updates with filtered events
        const filteredEvents = screen.getAllByTestId('event-item').filter(event => 
            event.textContent.includes('2023-12-25')
        );
        expect(filteredEvents.length).toBeGreaterThan(0);
    });

    it('should allow navigation to an event\'s details page', () => {
        render(
            <Router>
                <EventPage />
            </Router>
        );

        // Simulate clicking on an event item
        const eventItem = screen.getAllByTestId('event-item')[0];
        fireEvent.click(eventItem);

        // Check if the URL has changed to the event details page
        expect(window.location.pathname).toMatch(/\/events\/\d+/);
    });

    it('should display an error message if no events are found', () => {
        render(
            <Router>
                <EventPage />
            </Router>
        );

        // Simulate a scenario where no events match the filter
        fireEvent.change(screen.getByLabelText(/Filter by Date/i), { target: { value: '1900-01-01' } });

        // Check for error message
        expect(screen.getByText(/No events found for this date/i)).toBeInTheDocument();
    });
});
