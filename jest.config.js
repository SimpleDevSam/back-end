"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: 'test/.*\\.e2e-spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.(t|j)s'],
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
exports.default = config;
