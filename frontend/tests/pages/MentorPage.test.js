// /frontend/tests/pages/MentorPage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MentorPage from '../../src/pages/MentorPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('MentorPage Component', () => {
    it('should render the MentorPage with a list of mentors', () => {
        render(
            <Router>
                <MentorPage />
            </Router>
        );

        // Check for the presence of mentor list elements
        expect(screen.getByTestId('mentor-list')).toBeInTheDocument();
        expect(screen.getAllByTestId('mentor-item').length).toBeGreaterThan(0);
    });

    it('should allow filtering mentors by expertise', () => {
        render(
            <Router>
                <MentorPage />
            </Router>
        );

        // Simulate selecting a filter option
        fireEvent.change(screen.getByLabelText(/Filter by Expertise/i), { target: { value: 'Technology' } });

        // Check if the list updates with filtered mentors
        const filteredMentors = screen.getAllByTestId('mentor-item').filter(mentor => 
            mentor.textContent.includes('Technology')
        );
        expect(filteredMentors.length).toBeGreaterThan(0);
    });

    it('should allow navigation to a mentor\'s profile', () => {
        render(
            <Router>
                <MentorPage />
            </Router>
        );

        // Simulate clicking on a mentor item
        const mentorItem = screen.getAllByTestId('mentor-item')[0];
        fireEvent.click(mentorItem);

        // Check if the URL has changed to the mentor profile page
        expect(window.location.pathname).toMatch(/\/mentors\/\d+/);
    });

    it('should display an error message if no mentors are found', () => {
        render(
            <Router>
                <MentorPage />
            </Router>
        );

        // Simulate a scenario where no mentors match the filter
        fireEvent.change(screen.getByLabelText(/Filter by Expertise/i), { target: { value: 'Nonexistent Expertise' } });

        // Check for error message
        expect(screen.getByText(/No mentors found for this expertise/i)).toBeInTheDocument();
    });
});
