const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  "best-practices": 100,
  seo: 100,
  pwa: 100,
};

const VALID_BROWSERS: Record<string, boolean> = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

const lighthouseCommandHandler = (
  thresholds?: Cypress.LighthouseThresholds,
  opts?: object,
  config?: object,
) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.lighthouse()",
      `${Cypress.browser.displayName} is not supported. Skipping...`,
    );
  }

  return cy.url().then((url) => {
    const lighthouseConfig = Cypress.config("lighthouse") as
      | { thresholds?: Cypress.LighthouseThresholds; options?: object; config?: object }
      | undefined;

    const configThresholds = lighthouseConfig?.thresholds;
    const globalOptions = lighthouseConfig?.options;
    const globalConfig = lighthouseConfig?.config;

    if (!thresholds && !configThresholds) {
      cy.log(
        "mtfh-cypress",
        "No lighthouse thresholds configured; defaulting to 100 for every metric.",
      );
    }

    cy.log("-------- cy.lighthouse --------");
    return cy
      .task("lighthouse", {
        url,
        thresholds: thresholds || configThresholds || defaultThresholds,
        opts: opts || globalOptions,
        config: config || globalConfig,
      })
      .then((lighthouseResult) => {
        if (!lighthouseResult) {
          throw new Error("Lighthouse did not return a result.");
        }

        const { errors, results } = lighthouseResult as {
          errors: string[];
          results: string[];
        };

        results.forEach((res) => {
          cy.log(res);
        });
        cy.log("-----------------------------");

        return cy.wrap(errors);
      })
      .then((errors) => {
        if (errors.length > 0) {
          const formattedErrors = `\n\n${errors.join("\n")}`;
          const label =
            errors.length === 1
              ? `cy.lighthouse - A threshold has been crossed.${formattedErrors}`
              : `cy.lighthouse - Some thresholds have been crossed.${formattedErrors}`;
          throw new Error(label);
        }
      });
  });
};

export default lighthouseCommandHandler;
