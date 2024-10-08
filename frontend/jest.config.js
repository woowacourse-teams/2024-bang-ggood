/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    '^.+.tsx?$': ['esbuild-jest', { sourcemap: true }],
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/src/mocks/svg.ts',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['\\.spec\\.ts$'],
};
