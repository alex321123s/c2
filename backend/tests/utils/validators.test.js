// /backend/tests/utils/validators.test.js

const validators = require('../../utils/validators');

describe('Validators Utils', () => {
    
    describe('isEmailValid', () => {
        it('should return true for valid email addresses', () => {
            expect(validators.isEmailValid('test@example.com')).toBe(true);
            expect(validators.isEmailValid('user.name@domain.co')).toBe(true);
        });

        it('should return false for invalid email addresses', () => {
            expect(validators.isEmailValid('invalid-email')).toBe(false);
            expect(validators.isEmailValid('user@.com')).toBe(false);
            expect(validators.isEmailValid('user@domain')).toBe(false);
        });
    });

    describe('isPasswordStrong', () => {
        it('should return true for strong passwords', () => {
            expect(validators.isPasswordStrong('StrongP@ssw0rd!')).toBe(true);
            expect(validators.isPasswordStrong('Another$trong1')).toBe(true);
        });

        it('should return false for weak passwords', () => {
            expect(validators.isPasswordStrong('weak')).toBe(false);
            expect(validators.isPasswordStrong('12345678')).toBe(false);
            expect(validators.isPasswordStrong('password')).toBe(false);
        });
    });

    describe('isUsernameValid', () => {
        it('should return true for valid usernames', () => {
            expect(validators.isUsernameValid('valid_user123')).toBe(true);
            expect(validators.isUsernameValid('anotherUser')).toBe(true);
        });

        it('should return false for invalid usernames', () => {
            expect(validators.isUsernameValid('invalid user')).toBe(false);
            expect(validators.isUsernameValid('user@name')).toBe(false);
            expect(validators.isUsernameValid('')).toBe(false);
        });
    });
});
