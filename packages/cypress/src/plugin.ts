/// <reference types="cypress" />

import fs from "fs";
import path from "path";

export const configPlugin: Cypress.PluginConfig = (on, config) => {
  const version = config.env.ENVIRONMENT || "development";

  try {
    const envConfigJSON = fs.readFileSync(
      path.resolve(config.supportFolder, "..", "config", `${version}.json`),
      "utf-8",
    );
    const envConfig = JSON.parse(envConfigJSON);
    config = {
      ...config,
      ...envConfig,
      env: {
        ...config.env,
        ...envConfig.env,
      },
    };
  } catch {
    throw new Error(`Unable to parse config/${version}.json`);
  }

  return config;
};
