// /frontend/tests/services/feedback.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getFeedback, submitFeedback, updateFeedback, deleteFeedback } from '../../src/services/feedback';

describe('Feedback Service', () => {
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

    it('should fetch feedback successfully', async () => {
        const response = [{ id: '1', message: 'Great idea!' }, { id: '2', message: 'Needs improvement.' }];
        mock.onGet('/api/feedback').reply(200, response);

        const result = await getFeedback();
        
        expect(result).toEqual(response);
    });

    it('should handle error while fetching feedback', async () => {
        mock.onGet('/api/feedback').reply(500);

        try {
            await getFeedback();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should submit feedback successfully', async () => {
        const newFeedback = { message: 'Excellent!' };
        const response = { id: '3', message: 'Excellent!' };
        mock.onPost('/api/feedback', newFeedback).reply(201, response);

        const result = await submitFeedback(newFeedback);
        
        expect(result).toEqual(response);
    });

    it('should handle error while submitting feedback', async () => {
        const newFeedback = { message: 'Excellent!' };
        mock.onPost('/api/feedback', newFeedback).reply(400);

        try {
            await submitFeedback(newFeedback);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should update feedback successfully', async () => {
        const feedbackId = '1';
        const updatedFeedback = { message: 'Updated feedback' };
        const response = { id: feedbackId, message: 'Updated feedback' };
        mock.onPut(`/api/feedback/${feedbackId}`, updatedFeedback).reply(200, response);

        const result = await updateFeedback(feedbackId, updatedFeedback);
        
        expect(result).toEqual(response);
    });

    it('should handle error while updating feedback', async () => {
        const feedbackId = '1';
        const updatedFeedback = { message: 'Updated feedback' };
        mock.onPut(`/api/feedback/${feedbackId}`, updatedFeedback).reply(404);

        try {
            await updateFeedback(feedbackId, updatedFeedback);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should delete feedback successfully', async () => {
        const feedbackId = '1';
        mock.onDelete(`/api/feedback/${feedbackId}`).reply(204);

        const result = await deleteFeedback(feedbackId);
        
        expect(result).toBeUndefined();
    });

    it('should handle error while deleting feedback', async () => {
        const feedbackId = '1';
        mock.onDelete(`/api/feedback/${feedbackId}`).reply(404);

        try {
            await deleteFeedback(feedbackId);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
