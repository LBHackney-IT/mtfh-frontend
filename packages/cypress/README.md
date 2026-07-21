# `@hackney/mtfh-cypress`

This package is intended to be used in conjunction with a live environment that uses
import-maps to resolve micro-frontends. It will stub an import-map with the URL defined in
the env. This allows us to test a local MFE against an environment without deploying,
while having access to the entire environment.

Requires **Cypress 13+** and **Node.js 24+**.

Lifecycle:

1. Before All hook visits the baseURL as an authenticated Hackney user to intercept
   configuration (feature toggles) and store as a fixture.
2. Do a request to `${DEV_URL}/import-map.json` and store the output.
3. Before Each hook will intercept all import-map.json requests and determine which
   import-map to stub with the DEV_URL payload.

## Installation

```bash
npm install @hackney/mtfh-cypress
npm install -D dotenv cypress@^13
```

## Usage

This library provides both a configuration plugin as well as a collection of hooks and
commands. Plugins run in the Node context within Cypress and commands run in the browser,
so we have to wire them up separately.

### Plugin

In `cypress.config.js` (Cypress 10+):

```js
const { defineConfig } = require("cypress");
const { configPlugin } = require("@hackney/mtfh-cypress/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return configPlugin(on, config);
    },
    env: {
      DEV_URL: "http://localhost:9000",
    },
  },
});
```

Create a `.env` file in the root of your project:

```
CYPRESS_ENVIRONMENT=development
CYPRESS_BASE_URL=https://manage-my-home-development.hackney.gov.uk
CYPRESS_AUTH_TOKEN=token
```

Configure these variables in your CI pipeline to match your environment.

### Hooks & Commands

In `cypress/support/e2e.js` (or `cypress/support/index.js`):

```js
import "@hackney/mtfh-cypress";
```

This will import the `@testing-library/cypress` commands to mirror the FE unit testing
approaches we use.

Commands added:

```js
// Visit a url with authenticated credentials
cy.authVisit("/", options);
// Visit a url as a guest (unauthenticated)
cy.guestVisit("/", options);
// Get the value of a feature toggle
cy.hasToggle("MMH.CreateTenure").then((bool) => {});
// Skip test on ENVIRONMENT env
cy.skipOnEnv("development");
// Skip test on Feature Toggle
cy.skipOnToggle("MMH.CreateTenure", true);
```

To skip a collection of tests encapsulate the tests in a `describe`:

```js
describe("Collection of tests", () => {
  before(() => {
    cy.skipOnToggle("MMH.CreateTenure", true);
  });

  it("creates a tenure", () => {
    // ...
  });
});
```

## Audits

We provide commands for performance and accessibility testing using **Lighthouse** and
**Pa11y** directly (no `@cypress-audit/*` packages).

```js
// Equivalent of testing for mobile
cy.lighthouse({
  seo: 0,
  "best-practices": 100,
  accessibility: 100,
  performance: 80,
});

// Runs lighthouse with the desktop config
cy.lighthouseDesktop({
  seo: 0,
  "best-practices": 100,
  accessibility: 100,
  performance: 80,
});

// Runs accessibility testing, using pa11y
cy.pa11y({ actions: ["wait for element h1 to be added"] });
```

NB: Lighthouse performance metrics from this plugin can't really be taken as an indication
of the live report. This package is intended to run a local version of the micro-frontend
so we can test against it before deploying — i.e. against an app that isn't served by our
architecture. You can use it as a quality gate so new changes don't reduce the scores. We
recommend manual performance testing in live environments for real-world values.

## Additions

This library comes with the following preconfigured:

- `@testing-library/cypress`
- `lighthouse` and `pa11y` (via custom Cypress tasks)
- `cypress-terminal-report`

## Configuration

The config plugin overrides a few Cypress defaults that align to the requirements more
closely, such as:

```js
{
  retries: {
    runMode: 2,
    openMode: 0,
  },
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
}
```
