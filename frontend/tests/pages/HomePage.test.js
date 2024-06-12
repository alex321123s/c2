// /frontend/tests/pages/HomePage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../../src/pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('HomePage Component', () => {
    it('should render the homepage with main sections', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Check for header elements
        expect(screen.getByText(/Welcome to C2/i)).toBeInTheDocument();
        expect(screen.getByText(/Discover and develop innovative ideas/i)).toBeInTheDocument();

        // Check for main sections
        expect(screen.getByText(/Submit Your Idea/i)).toBeInTheDocument();
        expect(screen.getByText(/Join the Community/i)).toBeInTheDocument();
        expect(screen.getByText(/Explore Resources/i)).toBeInTheDocument();
        expect(screen.getByText(/Meet Mentors/i)).toBeInTheDocument();
    });

    it('should have working links to main sections', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Check if links are present and have correct href attributes
        expect(screen.getByText(/Submit Your Idea/i).closest('a')).toHaveAttribute('href', '/submit-idea');
        expect(screen.getByText(/Join the Community/i).closest('a')).toHaveAttribute('href', '/community');
        expect(screen.getByText(/Explore Resources/i).closest('a')).toHaveAttribute('href', '/resources');
        expect(screen.getByText(/Meet Mentors/i).closest('a')).toHaveAttribute('href', '/mentors');
    });

    it('should navigate to the idea submission page when "Submit Your Idea" is clicked', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Simulate click on "Submit Your Idea"
        fireEvent.click(screen.getByText(/Submit Your Idea/i));
        expect(window.location.pathname).toBe('/submit-idea');
    });
});
