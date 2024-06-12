// /frontend/tests/components/FeedbackForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedbackForm from '../../src/components/FeedbackForm';

describe('FeedbackForm Component', () => {
    it('should render the feedback form', () => {
        render(<FeedbackForm />);

        expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Feedback/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('should handle form input and submission', () => {
        const mockSubmit = jest.fn();
        render(<FeedbackForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Your Feedback/i), { target: { value: 'Great platform!' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        expect(mockSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john.doe@example.com',
            feedback: 'Great platform!'
        });
    });

    it('should display error messages for invalid input', () => {
        render(<FeedbackForm />);

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Feedback is required/i)).toBeInTheDocument();
    });
});
