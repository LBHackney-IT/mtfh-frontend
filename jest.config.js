module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lbh-frontend|@mtfh)[/\\\\].+\\.(js|jsx)$",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "@lbh-mtfh/test-utils",
  ],
};
