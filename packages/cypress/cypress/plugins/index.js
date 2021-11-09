/// <reference types="cypress" />

const { configPlugin } = require("../../plugin");

module.exports = (on, config) => {
  let mmhConfig = configPlugin(on, config);
  return mmhConfig;
};
