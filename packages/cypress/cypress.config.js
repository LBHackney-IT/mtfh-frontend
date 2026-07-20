const { defineConfig } = require("cypress");

const { configPlugin } = require("./plugin");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    screenshotOnRunFailure: false,
    specPattern: "cypress/integration/**/*.js",
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {
      return configPlugin(on, config);
    },
  },
  env: {
    DEV_URL: "http://localhost:3000",
    ENVIRONMENT: "development",
    AUTH_TOKEN: "development-token",
  },
});
