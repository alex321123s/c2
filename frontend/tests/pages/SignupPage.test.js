// /frontend/tests/pages/SignupPage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignupPage from '../../src/pages/SignupPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SignupPage Component', () => {
    it('should render the signup form with all necessary fields', () => {
        render(
            <Router>
                <SignupPage />
            </Router>
        );

        // Check for name input
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name/i)).toHaveAttribute('type', 'text');

        // Check for email input
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toHaveAttribute('type', 'email');

        // Check for password input
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toHaveAttribute('type', 'password');

        // Check for confirm password input
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toHaveAttribute('type', 'password');

        // Check for signup button
        expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });

    it('should display error messages when fields are empty and signup button is clicked', () => {
        render(
            <Router>
                <SignupPage />
            </Router>
        );

        // Click signup button without filling the form
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        // Check for error messages
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Confirm Password is required/i)).toBeInTheDocument();
    });

    it('should call the signup function with correct data when form is submitted', () => {
        const mockSignup = jest.fn();
        
        render(
            <Router>
                <SignupPage signup={mockSignup} />
            </Router>
        );

        // Fill the form
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        // Check if the mock signup function was called with correct values
        expect(mockSignup).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });
    });

    it('should navigate to the login page when "Login" link is clicked', () => {
        render(
            <Router>
                <SignupPage />
            </Router>
        );

        // Click on "Login" link
        fireEvent.click(screen.getByText(/Login/i));
        expect(window.location.pathname).toBe('/login');
    });
});
