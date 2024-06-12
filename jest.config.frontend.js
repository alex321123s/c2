// jest.config.frontend.js
module.exports = {
    displayName: 'frontend',
    testEnvironment: 'jsdom',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage/frontend',
    coverageReporters: ['text', 'lcov'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['<rootDir>/frontend/src/setupTests.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    testMatch: ['<rootDir>/frontend/src/**/*.test.js'],
  };
  