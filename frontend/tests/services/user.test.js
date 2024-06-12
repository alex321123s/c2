// /frontend/tests/services/user.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUser, updateUser, deleteUser } from '../../src/services/user';

describe('User Service', () => {
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

    it('should fetch user data successfully', async () => {
        const userId = '123';
        const response = { id: userId, name: 'Test User', email: 'test@example.com' };
        mock.onGet(`/api/users/${userId}`).reply(200, response);

        const result = await getUser(userId);
        
        expect(result).toEqual(response);
    });

    it('should handle error while fetching user data', async () => {
        const userId = '123';
        mock.onGet(`/api/users/${userId}`).reply(404);

        try {
            await getUser(userId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update user data successfully', async () => {
        const userId = '123';
        const userData = { name: 'Updated User', email: 'updated@example.com' };
        mock.onPut(`/api/users/${userId}`, userData).reply(200, userData);

        const result = await updateUser(userId, userData);
        
        expect(result).toEqual(userData);
    });

    it('should handle error while updating user data', async () => {
        const userId = '123';
        const userData = { name: 'Updated User', email: 'updated@example.com' };
        mock.onPut(`/api/users/${userId}`, userData).reply(400);

        try {
            await updateUser(userId, userData);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should delete user successfully', async () => {
        const userId = '123';
        mock.onDelete(`/api/users/${userId}`).reply(204);

        const result = await deleteUser(userId);
        
        expect(result).toBeUndefined();
    });

    it('should handle error while deleting user', async () => {
        const userId = '123';
        mock.onDelete(`/api/users/${userId}`).reply(404);

        try {
            await deleteUser(userId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
