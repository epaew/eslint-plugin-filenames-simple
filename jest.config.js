module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '__tests__/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
};
