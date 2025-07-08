module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  setupFilesAfterEnv: ['jest-localstorage-mock', '<rootDir>/jest.setup.js'],
  resetMocks: false,
  roots: ['<rootDir>/app/test'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
