// /frontend/tests/components/EventCalendar.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventCalendar from '../../src/components/EventCalendar';

const mockEvents = [
    { id: 1, title: 'Hackathon', date: '2024-06-20', description: 'A 24-hour coding competition.' },
    { id: 2, title: 'Webinar on AI', date: '2024-07-15', description: 'An in-depth webinar on AI advancements.' },
];

describe('EventCalendar Component', () => {
    it('should render a list of events', () => {
        render(<EventCalendar events={mockEvents} />);

        expect(screen.getByText(/Hackathon/i)).toBeInTheDocument();
        expect(screen.getByText(/2024-06-20/i)).toBeInTheDocument();
        expect(screen.getByText(/A 24-hour coding competition./i)).toBeInTheDocument();

        expect(screen.getByText(/Webinar on AI/i)).toBeInTheDocument();
        expect(screen.getByText(/2024-07-15/i)).toBeInTheDocument();
        expect(screen.getByText(/An in-depth webinar on AI advancements./i)).toBeInTheDocument();
    });

    it('should display a message when no events are available', () => {
        render(<EventCalendar events={[]} />);

        expect(screen.getByText(/No events available/i)).toBeInTheDocument();
    });

    it('should handle event selection', () => {
        const handleSelect = jest.fn();
        render(<EventCalendar events={mockEvents} onSelectEvent={handleSelect} />);

        fireEvent.click(screen.getByText(/Hackathon/i));
        expect(handleSelect).toHaveBeenCalledWith(mockEvents[0]);

        fireEvent.click(screen.getByText(/Webinar on AI/i));
        expect(handleSelect).toHaveBeenCalledWith(mockEvents[1]);
    });
});
