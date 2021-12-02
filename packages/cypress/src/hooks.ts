import path from "path";

type FeatureToggles = Record<string, Record<string, boolean>>;
const getScope = (key: string) => {
  const [org, project] = key.split("/");
  return `${org}/${project}`;
};

const clearSw = () => {
  cy.window().then((win) => {
    if ("serviceWorker" in win.navigator) {
      win.navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  });
};

beforeEach(() => {
  clearSw();
});

afterEach(() => {
  clearSw();
});

before(() => {
  // Disable the service worker. Cypress support for service workers is limited.
  // We have to investigate an optimal solution to support a SW.
  cy.intercept(`/sw.js`, { middleware: true }, (req) => {
    req.destroy();
  });

  let toggles: FeatureToggles = {};
  // Collect the feature toggles and place in a store
  cy.intercept(
    `/*/api/*/configuration?types=MMH`,
    { middleware: true, times: 1 },
    (req) => {
      req.continue((res) => {
        try {
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
        } catch (e) {
          if (e instanceof Error) {
            console.warn("Middleware", e.message);
          }
        }
        res.send(res.body);
      });
    },
  )
    .as("configuration")
    .authVisit("/")
    .wait("@configuration")
    .then(() => {
      cy.log(JSON.stringify(toggles, null, 2));
      cy.writeFile(
        path.join(
          Cypress.config("fixturesFolder") || path.join("cypress", "fixtures"),
          "feature-toggles.json",
        ),
        toggles,
        "utf-8",
      );
    });

  // Get the import-map.json file from the local running webpackDevServer
  // then create an intercept for import maps to replace the calling MFE
  cy.request(`${Cypress.env("DEV_URL")}/import-map.json`).then((data) => {
    const importMap = data.body;
    if (!importMap.imports) {
      return;
    }
    const scope = getScope(Object.keys(importMap.imports)[0]);
    cy.log(`Identified MFE scope: ${scope}`);
    cy.intercept(`/import-map.json`, { middleware: true }, (req) => {
      req.continue((res) => {
        if (res.body.imports && getScope(Object.keys(res.body.imports)[0]) === scope) {
          res.send(importMap);
        }
      });
    }).as("importMaps");
  });
});
