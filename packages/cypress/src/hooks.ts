import path from "path";

type FeatureToggles = Record<string, Record<string, boolean>>;
const getScope = (key: string) => {
  const [org, project] = key.split("/");
  return `${org}/${project}`;
};

beforeEach(() => {
  // Get the import-map.json file from the local running webpackDevServer
  // then create an intercept for import maps to replace the calling MFE
  cy.request(`${Cypress.env("DEV_URL")}/import-map.json`).then((data) => {
    const importMap = data.body;
    if (!importMap.imports) return;
    const scope = getScope(Object.keys(importMap.imports)[0]);
    cy.log(`Identified MFE scope: ${scope}`);
    cy.intercept(`/import-map.json`, { middleware: true }, (req) => {
      req.continue((res) => {
        if (res.body.imports && getScope(Object.keys(res.body.imports)[0]) === scope) {
          res.send(importMap);
        }
      });
    });
  });
});

before(() => {
  let toggles: FeatureToggles = {};
  // Collect the feature toggles and place in a store
  cy.intercept(`/*/api/*/configuration?types=MMH`, { middleware: true }, (req) => {
    req.continue((res) => {
      const update = res.body.reduce(
        (
          accum: FeatureToggles,
          {
            type,
            featureToggles,
          }: { type: string; featureToggles: Record<string, boolean> },
        ) => {
          accum[`${type}`] = featureToggles;
          return accum;
        },
        {} as FeatureToggles,
      );
      toggles = update;
      res.send(res.body);
    });
  }).as("configuration");
  cy.authVisit("/");
  cy.wait("@configuration").then(() => {
    cy.writeFile(
      path.join(
        Cypress.config("fixturesFolder") || path.join("cypress", "fixtures"),
        "feature-toggles.json",
      ),
      toggles,
      "utf-8",
    );
  });
});
