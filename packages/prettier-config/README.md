# `@hackney/prettier-config`

A configuration for prettier, to create consistancy across Hackney projects.

## Usage

Install package as a dev dependency:

```
npm install --save-dev @hackney/prettier-config
// or
yarn add -D @hackney/prettier-config
```

Create a `.prettierrc.js` file in the root of your project.

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
