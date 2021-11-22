/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { configPlugin } = require("../../plugin");

module.exports = (on, config) => {
  return configPlugin(on, config);
};
