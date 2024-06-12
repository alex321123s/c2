// /frontend/tests/pages/IdeaPage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IdeaPage from '../../src/pages/IdeaPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('IdeaPage Component', () => {
    it('should render the IdeaPage with the idea form and idea list', () => {
        render(
            <Router>
                <IdeaPage />
            </Router>
        );

        // Check for the presence of the idea form
        expect(screen.getByTestId('idea-form')).toBeInTheDocument();

        // Check for the presence of the idea list
        expect(screen.getByTestId('idea-list')).toBeInTheDocument();
    });

    it('should add a new idea to the list when the form is submitted', () => {
        render(
            <Router>
                <IdeaPage />
            </Router>
        );

        // Fill the form
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Idea' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'This is a new idea description.' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Check if the new idea is added to the list
        expect(screen.getByText(/New Idea/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a new idea description./i)).toBeInTheDocument();
    });

    it('should display error messages when form fields are empty and submitted', () => {
        render(
            <Router>
                <IdeaPage />
            </Router>
        );

        // Submit the form without filling it
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Check for error messages
        expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    });

    it('should allow navigation to the idea details page when an idea is clicked', () => {
        render(
            <Router>
                <IdeaPage />
            </Router>
        );

        // Add a new idea
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Idea' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'This is a new idea description.' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Click on the new idea
        fireEvent.click(screen.getByText(/New Idea/i));

        // Check if the URL has changed to the idea details page
        expect(window.location.pathname).toBe('/idea/new-idea');
    });
});
