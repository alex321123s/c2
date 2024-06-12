// /frontend/tests/services/auth.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { login, signup, logout } from '../../src/services/auth';

describe('Auth Service', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    it('should login successfully', async () => {
        const credentials = { email: 'test@example.com', password: 'password123' };
        const response = { token: 'fake-jwt-token' };
        mock.onPost('/api/auth/login', credentials).reply(200, response);

        const result = await login(credentials.email, credentials.password);
        
        expect(result).toEqual(response);
    });

    it('should handle login error', async () => {
        const credentials = { email: 'test@example.com', password: 'password123' };
        mock.onPost('/api/auth/login', credentials).reply(401);

        try {
            await login(credentials.email, credentials.password);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should signup successfully', async () => {
        const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
        const response = { token: 'fake-jwt-token' };
        mock.onPost('/api/auth/signup', userData).reply(201, response);

        const result = await signup(userData.name, userData.email, userData.password);
        
        expect(result).toEqual(response);
    });

    it('should handle signup error', async () => {
        const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
        mock.onPost('/api/auth/signup', userData).reply(400);

        try {
            await signup(userData.name, userData.email, userData.password);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should logout successfully', () => {
        const result = logout();
        
        expect(result).toBeUndefined();
    });
});
