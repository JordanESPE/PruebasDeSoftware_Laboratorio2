module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/test/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/Lab2/'],
  modulePathIgnorePatterns: ['<rootDir>/Lab2/']
};
