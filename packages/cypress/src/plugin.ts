import fs from "fs";
import path from "path";

import { lighthouse, pa11y, prepareAudit } from "cypress-audit";
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";

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
        performance: 40,
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
    if (browser.name === "chrome") {
      launchOptions.args.push(
        "--unsafely-treat-insecure-origin-as-secure=http://local.hackney.gov.uk:9000",
      );
    }
    prepareAudit(launchOptions);

    return launchOptions;
  });

  installLogsPrinter(on);

  on("task", {
    lighthouse: lighthouse(console.log),
    pa11y: pa11y(console.log),
  });

  return config;
};
