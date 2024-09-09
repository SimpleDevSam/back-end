import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.', // Root directory where Jest should start looking for files
  testRegex: 'test/.*\\.e2e-spec\\.ts$', // Regex to match your test files
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'], // Collect coverage from source files
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
  },
};

export default config;
