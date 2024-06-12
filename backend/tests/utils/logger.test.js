// /backend/tests/utils/logger.test.js

const logger = require('../../utils/logger');
const winston = require('winston');

describe('Logger Utils', () => {
    let consoleLogSpy, winstonLogSpy;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        winstonLogSpy = jest.spyOn(winston, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should log info messages correctly', () => {
        const message = 'This is an info message';
        logger.info(message);
        expect(winstonLogSpy).toHaveBeenCalledWith('info', message);
    });

    it('should log error messages correctly', () => {
        const error = new Error('This is an error message');
        logger.error(error);
        expect(winstonLogSpy).toHaveBeenCalledWith('error', error.message);
    });

    it('should log debug messages correctly', () => {
        const debugMessage = 'This is a debug message';
        logger.debug(debugMessage);
        expect(winstonLogSpy).toHaveBeenCalledWith('debug', debugMessage);
    });

    it('should not log debug messages if the level is set to info', () => {
        const debugMessage = 'This debug message should not be logged';
        logger.transports.console.level = 'info';
        logger.debug(debugMessage);
        expect(winstonLogSpy).not.toHaveBeenCalledWith('debug', debugMessage);
    });
});
