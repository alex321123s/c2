// /frontend/tests/components/Navbar.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../src/components/Navbar';

describe('Navbar Component', () => {
    it('should render the navbar with all links', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Ideas/i)).toBeInTheDocument();
        expect(screen.getByText(/Mentors/i)).toBeInTheDocument();
        expect(screen.getByText(/Events/i)).toBeInTheDocument();
        expect(screen.getByText(/Resources/i)).toBeInTheDocument();
        expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    });

    it('should navigate to the correct page on link click', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.click(screen.getByText(/Home/i));
        expect(window.location.pathname).toBe('/');

        fireEvent.click(screen.getByText(/Ideas/i));
        expect(window.location.pathname).toBe('/ideas');

        fireEvent.click(screen.getByText(/Mentors/i));
        expect(window.location.pathname).toBe('/mentors');

        fireEvent.click(screen.getByText(/Events/i));
        expect(window.location.pathname).toBe('/events');

        fireEvent.click(screen.getByText(/Resources/i));
        expect(window.location.pathname).toBe('/resources');

        fireEvent.click(screen.getByText(/Profile/i));
        expect(window.location.pathname).toBe('/profile');
    });

    it('should highlight the active link', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.click(screen.getByText(/Home/i));
        expect(screen.getByText(/Home/i)).toHaveClass('active');

        fireEvent.click(screen.getByText(/Ideas/i));
        expect(screen.getByText(/Ideas/i)).toHaveClass('active');

        fireEvent.click(screen.getByText(/Mentors/i));
        expect(screen.getByText(/Mentors/i)).toHaveClass('active');

        fireEvent.click(screen.getByText(/Events/i));
        expect(screen.getByText(/Events/i)).toHaveClass('active');

        fireEvent.click(screen.getByText(/Resources/i));
        expect(screen.getByText(/Resources/i)).toHaveClass('active');

        fireEvent.click(screen.getByText(/Profile/i));
        expect(screen.getByText(/Profile/i)).toHaveClass('active');
    });
});
