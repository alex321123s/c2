// /frontend/tests/pages/LoginPage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../../src/pages/LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LoginPage Component', () => {
    it('should render the login form with email and password fields', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        // Check for email input
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toHaveAttribute('type', 'email');

        // Check for password input
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toHaveAttribute('type', 'password');

        // Check for login button
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it('should display error messages when fields are empty and login button is clicked', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        // Click login button without filling the form
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check for error messages
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    it('should call the login function with email and password when form is submitted', () => {
        const mockLogin = jest.fn();
        
        render(
            <Router>
                <LoginPage login={mockLogin} />
            </Router>
        );

        // Fill the form
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check if the mock login function was called with correct values
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should navigate to the signup page when "Sign Up" link is clicked', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        // Click on "Sign Up" link
        fireEvent.click(screen.getByText(/Sign Up/i));
        expect(window.location.pathname).toBe('/signup');
    });
});
