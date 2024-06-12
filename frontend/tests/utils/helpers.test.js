// /frontend/tests/utils/helpers.test.js

import { formatDate, capitalizeFirstLetter, generateRandomId } from '../../src/utils/helpers';

describe('Helper Functions', () => {
    describe('formatDate', () => {
        it('should format date correctly', () => {
            const date = new Date('2023-05-27T00:00:00Z');
            expect(formatDate(date)).toBe('27 May 2023');
        });

        it('should handle invalid date input', () => {
            expect(formatDate('invalid-date')).toBe('');
        });
    });

    describe('capitalizeFirstLetter', () => {
        it('should capitalize the first letter of a string', () => {
            expect(capitalizeFirstLetter('hello')).toBe('Hello');
        });

        it('should return an empty string if input is not a string', () => {
            expect(capitalizeFirstLetter(123)).toBe('');
            expect(capitalizeFirstLetter(null)).toBe('');
        });
    });

    describe('generateRandomId', () => {
        it('should generate a random ID of specified length', () => {
            const length = 10;
            const id = generateRandomId(length);
            expect(id).toHaveLength(length);
            expect(typeof id).toBe('string');
        });

        it('should generate different IDs for multiple calls', () => {
            const id1 = generateRandomId(10);
            const id2 = generateRandomId(10);
            expect(id1).not.toBe(id2);
        });
    });
});
