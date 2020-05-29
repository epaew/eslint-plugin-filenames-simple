module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tests/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.ts'],
};
