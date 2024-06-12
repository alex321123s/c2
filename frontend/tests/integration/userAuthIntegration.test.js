// /frontend/tests/integration/userAuthIntegration.test.js

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../../src/pages/LoginPage';
import SignupPage from '../../src/pages/SignupPage';
import api from '../../src/services/api';

jest.mock('../../src/services/api');

describe('User Authentication Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login the user successfully', async () => {
        const mockResponse = { data: { token: 'fake-token' } };
        api.post.mockResolvedValueOnce(mockResponse);

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'password' });
        });

        expect(localStorage.getItem('token')).toBe('fake-token');
        expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });

    it('should show an error message when login fails', async () => {
        api.post.mockRejectedValueOnce(new Error('Login failed'));

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'password' });
        });

        expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });

    it('should signup the user successfully', async () => {
        const mockResponse = { data: { token: 'fake-token' } };
        api.post.mockResolvedValueOnce(mockResponse);

        render(
            <Router>
                <SignupPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /signup/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/signup', { name: 'Test User', email: 'test@example.com', password: 'password' });
        });

        expect(localStorage.getItem('token')).toBe('fake-token');
        expect(screen.getByText(/signup successful/i)).toBeInTheDocument();
    });

    it('should show an error message when signup fails', async () => {
        api.post.mockRejectedValueOnce(new Error('Signup failed'));

        render(
            <Router>
                <SignupPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /signup/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/signup', { name: 'Test User', email: 'test@example.com', password: 'password' });
        });

        expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
    });
});
