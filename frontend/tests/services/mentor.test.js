// /frontend/tests/services/mentor.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getMentors, createMentor, updateMentor, deleteMentor } from '../../src/services/mentor';

describe('Mentor Service', () => {
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

    it('should fetch mentors successfully', async () => {
        const response = [{ id: '1', name: 'Mentor 1' }, { id: '2', name: 'Mentor 2' }];
        mock.onGet('/api/mentors').reply(200, response);

        const result = await getMentors();
        
        expect(result).toEqual(response);
    });

    it('should handle error while fetching mentors', async () => {
        mock.onGet('/api/mentors').reply(500);

        try {
            await getMentors();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should create a mentor successfully', async () => {
        const newMentor = { name: 'New Mentor' };
        const response = { id: '3', name: 'New Mentor' };
        mock.onPost('/api/mentors', newMentor).reply(201, response);

        const result = await createMentor(newMentor);
        
        expect(result).toEqual(response);
    });

    it('should handle error while creating a mentor', async () => {
        const newMentor = { name: 'New Mentor' };
        mock.onPost('/api/mentors', newMentor).reply(400);

        try {
            await createMentor(newMentor);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update a mentor successfully', async () => {
        const mentorId = '1';
        const updatedMentor = { name: 'Updated Mentor' };
        const response = { id: mentorId, name: 'Updated Mentor' };
        mock.onPut(`/api/mentors/${mentorId}`, updatedMentor).reply(200, response);

        const result = await updateMentor(mentorId, updatedMentor);
        
        expect(result).toEqual(response);
    });

    it('should handle error while updating a mentor', async () => {
        const mentorId = '1';
        const updatedMentor = { name: 'Updated Mentor' };
        mock.onPut(`/api/mentors/${mentorId}`, updatedMentor).reply(404);

        try {
            await updateMentor(mentorId, updatedMentor);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should delete a mentor successfully', async () => {
        const mentorId = '1';
        mock.onDelete(`/api/mentors/${mentorId}`).reply(204);

        const result = await deleteMentor(mentorId);
        
        expect(result).toBeUndefined();
    });

    it('should handle error while deleting a mentor', async () => {
        const mentorId = '1';
        mock.onDelete(`/api/mentors/${mentorId}`).reply(404);

        try {
            await deleteMentor(mentorId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
