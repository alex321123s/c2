// /frontend/tests/routes/PrivateRoute.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import PrivateRoute from '../../src/routes/PrivateRoute';
import HomePage from '../../src/pages/HomePage';
import LoginPage from '../../src/pages/LoginPage';
import { AuthContext } from '../../src/context/AuthContext';

describe('PrivateRoute Component', () => {
    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: MemoryRouter });
    };

    it('should render the HomePage component if authenticated', () => {
        const authContextValue = { isAuthenticated: true };

        renderWithRouter(
            <AuthContext.Provider value={authContextValue}>
                <PrivateRoute path="/home" component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </AuthContext.Provider>,
            { route: '/home' }
        );

        // Check if HomePage component is rendered
        expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });

    it('should redirect to LoginPage if not authenticated', () => {
        const authContextValue = { isAuthenticated: false };

        renderWithRouter(
            <AuthContext.Provider value={authContextValue}>
                <PrivateRoute path="/home" component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </AuthContext.Provider>,
            { route: '/home' }
        );

        // Check if LoginPage component is rendered
        expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });
});
