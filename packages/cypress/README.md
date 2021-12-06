# `@hackney/mtfh-cypress`

This package is intended to be used in conjuction with a live environment that uses
import-maps to resolve micro-frontends. It will stub an import-map with the url defined in
the env. This allows us to test a local MFE against an environment without deploying,
while having access to the entire environment.

Lifecycle:

1. Before All hook visits the baseURL as an authenticated hackney user to intercept
   configuration (feature toggles) and store as a fixture.
2. Do a request to `${DEV_URL}/import-map.json` and store the output.
3. Before Each hook will intercept all import-map.json requests and determine which
   import-map to stub with the DEV_URL payload.

## Installation

```
yarn add @hackney/mtfh-cli
yarn add dotenv cypress -D
```

## Usage

This library provides both a configuration plugin as well as a collection of hooks and
commands. Plugins run in the node context within cypress and commands run in the browser,
so we have to wire them up separately.

### Plugin

In `cypress/plugins/index.js`

```js
const { configPlugin } = require("@hackney/mtfh-cypress/plugin");

module.exports = (on, config) => {
  let mtfhConfig = configPlugin(on, config);
  return mtfhConfig;
};
```

Create a `.env` file in the root of your project.

```
CYPRESS_ENVIRONMENT=development
CYPRESS_BASE_URL=https://manage-my-home-development.hackney.gov.uk
CYPRESS_AUTH_TOKEN=token
```

You'll want to configure these variables in your circle ci pipeline to match your
environment.

In `cypress.json`

```js
{
  "env": {
    "DEV_URL": "http://localhost:9000",
  }
}
```

### Hooks & Commands

In `cypress/support/index.js`

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

To skip a collection of tests encapsulate the tests in a `describe`

```js
describe('Collection of tests', () => {
  before(() => {
    cy.skipOnToggle('MMH.CreateTenure', true);
  })

  it('creates a tenure', () => {
    ...
  })
})
```

## Audits

We provide commands for testing performance as well as accessibility.

```js
// Equalvalent of testing for mobile
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

NB: It's important to note that Lighthouse's performance metrics can't really be taken as
an indication of the actual report. This plugin is intended to run a local version of the
micro-frontend so we can test against it before deploying. Ie. we will be testing against
an app that isn't served by our architecture. You can however use it as a quality gate to
ensure new changes don't reduce the scores. We recommend manual performance testing in
live environments to get real world values.

## Additions

This library comes with the following preconfigured:

- @testing-libray/cypress
- cypress-audit
- cypress-terminal-report

## Configuration

The config plugin will override a few `cypress.json` defaults that align to the
requirements more closely.

Such as:

```js
{
  "retries": {
    "runMode": 2,
    "openMode": 0,
  },
  "chromeWebSecurity": false,
  "defaultCommandTimeout": 10000,
}
```
