import { lighthouse, pa11y, prepareAudit } from "cypress-audit";
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";
import dotenv from "dotenv";

export const configPlugin: Cypress.PluginConfig = (on, config) => {
  dotenv.config();
  const stage =
    process.env.CYPRESS_ENVIRONMENT || config.env.ENVIRONMENT || "development";
  const auth = process.env.CYPRESS_AUTH_TOKEN || config.env.AUTH_TOKEN;
  const baseUrl = process.env.CYPRESS_BASE_URL || config.baseUrl;

  config = {
    ...config,
    env: {
      ...config.env,
      ENVIRONMENT: stage,
      AUTH_TOKEN: auth,
    },
    baseUrl,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
  };

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
