// /frontend/tests/services/api.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchData, postData } from '../../src/services/api';

describe('API Service', () => {
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

    it('should fetch data successfully', async () => {
        const data = { id: 1, name: 'Test Item' };
        mock.onGet('/api/data').reply(200, data);

        const result = await fetchData('/api/data');
        
        expect(result).toEqual(data);
    });

    it('should handle fetch data error', async () => {
        mock.onGet('/api/data').reply(500);

        try {
            await fetchData('/api/data');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should post data successfully', async () => {
        const postDataContent = { name: 'New Item' };
        const response = { id: 1, name: 'New Item' };
        mock.onPost('/api/data', postDataContent).reply(201, response);

        const result = await postData('/api/data', postDataContent);
        
        expect(result).toEqual(response);
    });

    it('should handle post data error', async () => {
        const postDataContent = { name: 'New Item' };
        mock.onPost('/api/data', postDataContent).reply(500);

        try {
            await postData('/api/data', postDataContent);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
