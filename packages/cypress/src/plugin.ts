import fs from "fs";
import path from "path";

import { lighthouse, pa11y, prepareAudit } from "cypress-audit";

export const configPlugin: Cypress.PluginConfig = (on, config) => {
  const version = config.env.ENVIRONMENT || "development";

  try {
    const envConfigJSON = fs.readFileSync(
      path.resolve(config.supportFolder, "..", "config", `${version}.json`),
      "utf-8",
    );
    const envConfig = JSON.parse(envConfigJSON);
    config = {
      lighthouse: {
        performance: 30,
        accessibility: 90,
        "best-practices": 80,
        seo: 0,
        pwa: 0,
      },
      ...config,
      retries: {
        runMode: 2,
        openMode: 0,
      },
      chromeWebSecurity: false,
      defaultCommandTimeout: 10000,
      video: false,
      ...envConfig,
      env: {
        ...config.env,
        ...envConfig.env,
      },
    };
  } catch {
    throw new Error(`Unable to parse config/${version}.json`);
  }

  on("before:browser:launch", (browser, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport);
    }),
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });

  return config;
};
