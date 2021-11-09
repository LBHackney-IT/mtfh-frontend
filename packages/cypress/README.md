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

## Usage

### Plugin

In `cypress/plugins/index.js`

```js
const { configPlugin } = require("@hackney/mtfh-cypress/plugin");

module.exports = (on, config) => {
  let mtfhConfig = configPlugin(on, config);
  return mtfhConfig;
};
```

Create a folder with relevant environment json files

```
cypress
└── config
    ├── development.json
    ├── staging.json
    └── production.json
```

With a minimal config, e.g. `cypress/config/development.json`:

```js
{
  "baseUrl": "https://manage-my-home-development.hackney.gov.uk",
  "env": {
    "AUTH_TOKEN": "..."
  }
}
```

In `cypress.json`

```js
{
  "env": {
    "DEV_URL": "http://localhost:9000",
    "ENVIRONMENT": "development"
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
  "video": false,
}
```

The config recieved by the plugin is hydrated with defaults which are impossible to know
are intended. To override this behaviour you have an opportunity to set additional
configuration in the config environment files.
