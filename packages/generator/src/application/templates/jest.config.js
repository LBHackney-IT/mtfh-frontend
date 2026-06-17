const path = require("path");

const interceptorsRoot = path.join(
  __dirname,
  "node_modules/@mswjs/interceptors/lib/node/interceptors",
);

module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  setupFiles: [path.join(__dirname, "jest.polyfills.js")],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(mjs|[jt]sx?)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^react-router-dom$": path.join(__dirname, "node_modules/react-router-dom"),
    "^react-router$": path.join(__dirname, "node_modules/react-router"),
    "^react-dom/client$": path.join(__dirname, "node_modules/react-dom/client.js"),
    "^msw/node$": path.join(__dirname, "node_modules/msw/lib/node/index.js"),
    "^@mswjs/interceptors/ClientRequest$": path.join(
      interceptorsRoot,
      "ClientRequest/index.cjs",
    ),
    "^@mswjs/interceptors/XMLHttpRequest$": path.join(
      interceptorsRoot,
      "XMLHttpRequest/index.cjs",
    ),
    "^@mswjs/interceptors/fetch$": path.join(interceptorsRoot, "fetch/index.cjs"),
    "^@mswjs/interceptors/WebSocket$": path.join(
      __dirname,
      "node_modules/@mswjs/interceptors/lib/browser/interceptors/WebSocket/index.cjs",
    ),
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lbh-frontend|@mtfh|msw|@mswjs|rettime|until-async|strict-event-emitter|@bundled-es-modules|@open-draft|@faker-js|undici)[/\\\\].+\\.(js|jsx|mjs)$",
  ],
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "@hackney/mtfh-test-utils"],
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
