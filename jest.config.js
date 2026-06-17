const path = require("path");

const interceptorsRoot = path.join(
  __dirname,
  "node_modules/@mswjs/interceptors/lib/node/interceptors",
);

module.exports = {
  preset: "ts-jest",
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
  setupFilesAfterEnv: ["@testing-library/jest-dom", "@hackney/mtfh-test-utils"],
};
