// jest.config.backend.js
module.exports = {
    displayName: 'backend',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage/backend',
    coverageReporters: ['text', 'lcov'],
    moduleFileExtensions: ['js', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {},
    moduleNameMapper: {},
    testMatch: ['<rootDir>/backend/tests/**/*.test.js'],
  };
  