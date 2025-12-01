module.exports = {
  transformIgnorePatterns: ["node_modules/(?!(@ui5|lit-html|@babel)).*\\.js$"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/styleMock.js",
  },
  collectCoverage: true,
  testEnvironment: "jsdom",
};
