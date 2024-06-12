// /frontend/tests/services/idea.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getIdeas, createIdea, updateIdea, deleteIdea } from '../../src/services/idea';

describe('Idea Service', () => {
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

    it('should fetch ideas successfully', async () => {
        const response = [{ id: '1', title: 'Idea 1' }, { id: '2', title: 'Idea 2' }];
        mock.onGet('/api/ideas').reply(200, response);

        const result = await getIdeas();
        
        expect(result).toEqual(response);
    });

    it('should handle error while fetching ideas', async () => {
        mock.onGet('/api/ideas').reply(500);

        try {
            await getIdeas();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should create an idea successfully', async () => {
        const newIdea = { title: 'New Idea' };
        const response = { id: '3', title: 'New Idea' };
        mock.onPost('/api/ideas', newIdea).reply(201, response);

        const result = await createIdea(newIdea);
        
        expect(result).toEqual(response);
    });

    it('should handle error while creating an idea', async () => {
        const newIdea = { title: 'New Idea' };
        mock.onPost('/api/ideas', newIdea).reply(400);

        try {
            await createIdea(newIdea);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update an idea successfully', async () => {
        const ideaId = '1';
        const updatedIdea = { title: 'Updated Idea' };
        const response = { id: ideaId, title: 'Updated Idea' };
        mock.onPut(`/api/ideas/${ideaId}`, updatedIdea).reply(200, response);

        const result = await updateIdea(ideaId, updatedIdea);
        
        expect(result).toEqual(response);
    });

    it('should handle error while updating an idea', async () => {
        const ideaId = '1';
        const updatedIdea = { title: 'Updated Idea' };
        mock.onPut(`/api/ideas/${ideaId}`, updatedIdea).reply(404);

        try {
            await updateIdea(ideaId, updatedIdea);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should delete an idea successfully', async () => {
        const ideaId = '1';
        mock.onDelete(`/api/ideas/${ideaId}`).reply(204);

        const result = await deleteIdea(ideaId);
        
        expect(result).toBeUndefined();
    });

    it('should handle error while deleting an idea', async () => {
        const ideaId = '1';
        mock.onDelete(`/api/ideas/${ideaId}`).reply(404);

        try {
            await deleteIdea(ideaId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
