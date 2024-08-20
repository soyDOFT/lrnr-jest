module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', 
    },
    testEnvironment: 'jest-environment-jsdom', 
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], 
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'], 
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', 
    },
    transformIgnorePatterns: ['/node_modules/'],
  };