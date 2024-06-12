// /frontend/tests/routes/PublicRoute.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import PublicRoute from '../../src/routes/PublicRoute';
import HomePage from '../../src/pages/HomePage';
import LoginPage from '../../src/pages/LoginPage';
import { AuthContext } from '../../src/context/AuthContext';

describe('PublicRoute Component', () => {
    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: MemoryRouter });
    };

    it('should render the LoginPage component if not authenticated', () => {
        const authContextValue = { isAuthenticated: false };

        renderWithRouter(
            <AuthContext.Provider value={authContextValue}>
                <PublicRoute path="/login" component={LoginPage} />
                <Route path="/home" component={HomePage} />
            </AuthContext.Provider>,
            { route: '/login' }
        );

        // Check if LoginPage component is rendered
        expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });

    it('should redirect to HomePage if authenticated', () => {
        const authContextValue = { isAuthenticated: true };

        renderWithRouter(
            <AuthContext.Provider value={authContextValue}>
                <PublicRoute path="/login" component={LoginPage} />
                <Route path="/home" component={HomePage} />
            </AuthContext.Provider>,
            { route: '/login' }
        );

        // Check if HomePage component is rendered
        expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });
});
