const path = require("path");

const interceptorsRoot = path.join(
  __dirname,
  "node_modules/@mswjs/interceptors/lib/node/interceptors",
);

const rootNodeModules = path.join(__dirname, "node_modules");

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
    "^react$": path.join(rootNodeModules, "react/index.js"),
    "^react/jsx-runtime$": path.join(rootNodeModules, "react/jsx-runtime.js"),
    "^react/jsx-dev-runtime$": path.join(rootNodeModules, "react/jsx-dev-runtime.js"),
    "^react-dom$": path.join(rootNodeModules, "react-dom/index.js"),
    "^react-router-dom$": path.join(rootNodeModules, "react-router-dom"),
    "^react-router$": path.join(rootNodeModules, "react-router"),
    "^react-dom/client$": path.join(rootNodeModules, "react-dom/client.js"),
    "^msw/node$": path.join(rootNodeModules, "msw/lib/node/index.js"),
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
      rootNodeModules,
      "@mswjs/interceptors/lib/browser/interceptors/WebSocket/index.cjs",
    ),
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lbh-frontend|@mtfh|msw|@mswjs|rettime|until-async|strict-event-emitter|@bundled-es-modules|@open-draft|@faker-js|undici)[/\\\\].+\\.(js|jsx|mjs)$",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "@hackney/mtfh-test-utils"],
};
