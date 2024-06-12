// /frontend/tests/utils/responseHandler.test.js

import { handleSuccess, handleError } from '../../src/utils/responseHandler';

describe('Response Handler Functions', () => {
    describe('handleSuccess', () => {
        it('should return a success message with correct format', () => {
            const message = 'Operation completed successfully';
            const data = { id: 1, name: 'Test' };
            const response = handleSuccess(message, data);
            expect(response).toEqual({
                status: 'success',
                message,
                data
            });
        });

        it('should return a success message without data if data is not provided', () => {
            const message = 'Operation completed successfully';
            const response = handleSuccess(message);
            expect(response).toEqual({
                status: 'success',
                message,
                data: null
            });
        });
    });

    describe('handleError', () => {
        it('should return an error message with correct format', () => {
            const message = 'An error occurred';
            const error = new Error('Test error');
            const response = handleError(message, error);
            expect(response).toEqual({
                status: 'error',
                message,
                error: error.message
            });
        });

        it('should return an error message without error object if error is not provided', () => {
            const message = 'An error occurred';
            const response = handleError(message);
            expect(response).toEqual({
                status: 'error',
                message,
                error: null
            });
        });
    });
});
