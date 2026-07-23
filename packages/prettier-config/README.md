# `@hackney/prettier-config`

Shared Prettier configuration for Hackney front-end projects.

## Usage

Install the package as a dev dependency:

```bash
npm install -D @hackney/prettier-config
```

Create a `.prettierrc.js` file in the root of your project:

```js
const prettierConfig = require("@hackney/prettier-config");

module.exports = prettierConfig;
```

To apply overrides of any of the options:

```js
const prettierConfig = require("@hackney/prettier-config");

module.exports = {
  ...prettierConfig,
  semi: false,
};
```
