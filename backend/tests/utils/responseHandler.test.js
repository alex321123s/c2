// /backend/tests/utils/responseHandler.test.js

const responseHandler = require('../../utils/responseHandler');

describe('Response Handler Utils', () => {
    
    describe('success', () => {
        it('should return a success response object with the provided message and data', () => {
            const message = 'Operation was successful';
            const data = { id: 1, name: 'Test' };
            const response = responseHandler.success(message, data);
            
            expect(response).toEqual({
                status: 'success',
                message,
                data
            });
        });

        it('should return a success response object with a default message if none is provided', () => {
            const data = { id: 1, name: 'Test' };
            const response = responseHandler.success(null, data);
            
            expect(response).toEqual({
                status: 'success',
                message: 'Operation was successful',
                data
            });
        });
    });

    describe('error', () => {
        it('should return an error response object with the provided message and error details', () => {
            const message = 'An error occurred';
            const error = { code: 500, description: 'Internal Server Error' };
            const response = responseHandler.error(message, error);
            
            expect(response).toEqual({
                status: 'error',
                message,
                error
            });
        });

        it('should return an error response object with a default message if none is provided', () => {
            const error = { code: 500, description: 'Internal Server Error' };
            const response = responseHandler.error(null, error);
            
            expect(response).toEqual({
                status: 'error',
                message: 'An error occurred',
                error
            });
        });
    });
});
