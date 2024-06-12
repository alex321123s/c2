// /frontend/tests/utils/constants.test.js

import { API_BASE_URL, TOKEN_KEY, USER_ROLE, MENTOR_ROLE } from '../../src/utils/constants';

describe('Constants', () => {
    it('should have correct API_BASE_URL', () => {
        expect(API_BASE_URL).toBe('https://api.example.com');
    });

    it('should have correct TOKEN_KEY', () => {
        expect(TOKEN_KEY).toBe('authToken');
    });

    it('should have correct USER_ROLE', () => {
        expect(USER_ROLE).toBe('USER');
    });

    it('should have correct MENTOR_ROLE', () => {
        expect(MENTOR_ROLE).toBe('MENTOR');
    });
});
