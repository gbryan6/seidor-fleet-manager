module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  coverageReporters: ['html', 'json', 'lcov'],
  coverageDirectory: './coverage/fleet-api',
  setupFilesAfterEnv: ['<rootDir>/src/mocks/prisma.ts'],
  collectCoverage: true,
};