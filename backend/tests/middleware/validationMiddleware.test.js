// /backend/tests/middleware/validationMiddleware.test.js

const validationMiddleware = require('../../middleware/validationMiddleware');
const { check, validationResult } = require('express-validator');

describe('Validation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    const mockValidators = [
        check('email').isEmail().withMessage('Must be a valid email'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ];

    it('should call next() if there are no validation errors', async () => {
        req.body = { email: 'test@example.com', password: 'password123' };

        await Promise.all(mockValidators.map(validator => validator.run(req)));
        validationMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should return 400 and validation errors if validation fails', async () => {
        req.body = { email: 'invalid-email', password: '123' };

        await Promise.all(mockValidators.map(validator => validator.run(req)));
        validationMiddleware(req, res, next);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ errors: errors.array() });
        expect(next).not.toHaveBeenCalled();
    });
});
