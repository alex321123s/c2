// /backend/tests/middleware/authMiddleware.test.js

const authMiddleware = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer validtoken'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    it('should call next if token is valid', () => {
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { userId: '123' });
        });

        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if no token is provided', () => {
        req.headers.authorization = null;

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
    });

    it('should return 401 if token is invalid', () => {
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(new Error('Invalid token'), null);
        });

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });

    it('should attach user to req if token is valid', () => {
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, { userId: '123' });
        });

        authMiddleware(req, res, next);

        expect(req.user).toEqual({ userId: '123' });
    });
});
