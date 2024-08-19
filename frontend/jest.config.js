/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/src/mocks/svg.ts',
  },
  testEnvironment: 'jest-environment-jsdom',
};
