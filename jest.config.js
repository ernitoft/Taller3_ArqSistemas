module.exports = {
  testEnvironment: "jsdom",
  testTimeout: 10000, // Tiempo de espera en milisegundos
  transformIgnorePatterns: ["/node_modules/(?!axios).+\\.js$"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
