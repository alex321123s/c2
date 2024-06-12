// /frontend/tests/pages/FeedbackPage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedbackPage from '../../src/pages/FeedbackPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('FeedbackPage Component', () => {
    it('should render the FeedbackPage with a feedback form', () => {
        render(
            <Router>
                <FeedbackPage />
            </Router>
        );

        // Check for the presence of the feedback form elements
        expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Feedback/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('should allow users to submit feedback', () => {
        render(
            <Router>
                <FeedbackPage />
            </Router>
        );

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Your Feedback/i), { target: { value: 'This is a feedback message.' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Check for success message after form submission
        expect(screen.getByText(/Thank you for your feedback!/i)).toBeInTheDocument();
    });

    it('should display an error message if feedback is empty', () => {
        render(
            <Router>
                <FeedbackPage />
            </Router>
        );

        // Simulate submitting an empty form
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Check for error message
        expect(screen.getByText(/Feedback cannot be empty/i)).toBeInTheDocument();
    });

    it('should handle API errors gracefully', () => {
        // Mock fetch or axios to simulate API error
        jest.spyOn(global, 'fetch').mockImplementation(() => 
            Promise.reject(new Error('API error'))
        );

        render(
            <Router>
                <FeedbackPage />
            </Router>
        );

        // Simulate user input and form submission
        fireEvent.change(screen.getByLabelText(/Your Feedback/i), { target: { value: 'This is a feedback message.' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Check for error message
        expect(screen.getByText(/An error occurred while submitting your feedback/i)).toBeInTheDocument();

        // Restore original fetch implementation
        global.fetch.mockRestore();
    });
});
