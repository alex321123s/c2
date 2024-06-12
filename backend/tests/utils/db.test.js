// /backend/tests/utils/db.test.js

const mongoose = require('mongoose');
const db = require('../../utils/db');
const config = require('../../config/default.json');

describe('Database Utils', () => {
    let connectSpy, disconnectSpy;

    beforeEach(() => {
        connectSpy = jest.spyOn(mongoose, 'connect').mockImplementation(() => Promise.resolve());
        disconnectSpy = jest.spyOn(mongoose, 'disconnect').mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should connect to the database successfully', async () => {
        await db.connect();
        expect(connectSpy).toHaveBeenCalledWith(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    it('should handle connection errors gracefully', async () => {
        connectSpy.mockImplementationOnce(() => Promise.reject(new Error('Connection failed')));
        await expect(db.connect()).rejects.toThrow('Connection failed');
    });

    it('should disconnect from the database successfully', async () => {
        await db.disconnect();
        expect(disconnectSpy).toHaveBeenCalled();
    });
});
