# `@hackney/prettier-config`

A configuration for Prettier, to create consistency across Hackney projects.

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
