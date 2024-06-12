// /frontend/tests/services/resource.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getResources, createResource, updateResource, deleteResource } from '../../src/services/resource';

describe('Resource Service', () => {
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

    it('should fetch resources successfully', async () => {
        const response = [{ id: '1', name: 'Resource 1' }, { id: '2', name: 'Resource 2' }];
        mock.onGet('/api/resources').reply(200, response);

        const result = await getResources();
        
        expect(result).toEqual(response);
    });

    it('should handle error while fetching resources', async () => {
        mock.onGet('/api/resources').reply(500);

        try {
            await getResources();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should create a resource successfully', async () => {
        const newResource = { name: 'New Resource' };
        const response = { id: '3', name: 'New Resource' };
        mock.onPost('/api/resources', newResource).reply(201, response);

        const result = await createResource(newResource);
        
        expect(result).toEqual(response);
    });

    it('should handle error while creating a resource', async () => {
        const newResource = { name: 'New Resource' };
        mock.onPost('/api/resources', newResource).reply(400);

        try {
            await createResource(newResource);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update a resource successfully', async () => {
        const resourceId = '1';
        const updatedResource = { name: 'Updated Resource' };
        const response = { id: resourceId, name: 'Updated Resource' };
        mock.onPut(`/api/resources/${resourceId}`, updatedResource).reply(200, response);

        const result = await updateResource(resourceId, updatedResource);
        
        expect(result).toEqual(response);
    });

    it('should handle error while updating a resource', async () => {
        const resourceId = '1';
        const updatedResource = { name: 'Updated Resource' };
        mock.onPut(`/api/resources/${resourceId}`, updatedResource).reply(404);

        try {
            await updateResource(resourceId, updatedResource);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should delete a resource successfully', async () => {
        const resourceId = '1';
        mock.onDelete(`/api/resources/${resourceId}`).reply(204);

        const result = await deleteResource(resourceId);
        
        expect(result).toBeUndefined();
    });

    it('should handle error while deleting a resource', async () => {
        const resourceId = '1';
        mock.onDelete(`/api/resources/${resourceId}`).reply(404);

        try {
            await deleteResource(resourceId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
