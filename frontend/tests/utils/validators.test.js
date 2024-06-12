// /frontend/tests/utils/validators.test.js

import { isEmailValid, isPasswordStrong, isUsernameValid } from '../../src/utils/validators';

describe('Validator Functions', () => {
    describe('isEmailValid', () => {
        it('should validate correct email addresses', () => {
            expect(isEmailValid('test@example.com')).toBe(true);
            expect(isEmailValid('user.name+tag+sorting@example.com')).toBe(true);
        });

        it('should invalidate incorrect email addresses', () => {
            expect(isEmailValid('plainaddress')).toBe(false);
            expect(isEmailValid('@missingusername.com')).toBe(false);
            expect(isEmailValid('username@.com')).toBe(false);
        });
    });

    describe('isPasswordStrong', () => {
        it('should validate strong passwords', () => {
            expect(isPasswordStrong('Str0ngP@ssword!')).toBe(true);
            expect(isPasswordStrong('S3cur3P@ssw0rd')).toBe(true);
        });

        it('should invalidate weak passwords', () => {
            expect(isPasswordStrong('password')).toBe(false);
            expect(isPasswordStrong('12345')).toBe(false);
            expect(isPasswordStrong('')).toBe(false);
        });
    });

    describe('isUsernameValid', () => {
        it('should validate correct usernames', () => {
            expect(isUsernameValid('username')).toBe(true);
            expect(isUsernameValid('user_name123')).toBe(true);
        });

        it('should invalidate incorrect usernames', () => {
            expect(isUsernameValid('user!name')).toBe(false);
            expect(isUsernameValid('')).toBe(false);
            expect(isUsernameValid('a')).toBe(false); // Assuming minimum length is 2
        });
    });
});
