# `@hackney/generator-mfe`

Yeoman generator for Hackney micro-frontend applications. Used by
[`@hackney/create-mfe`](../create-mfe) and `@hackney/mtfh-cli` (`new` / `upgrade`).

Requires **Node.js 24+**.

## Usage

Most of the time you should not run this package directly. Prefer:

```bash
npx @hackney/create-mfe
# or
mtfh-cli new my-app
mtfh-cli upgrade
```

### Direct Yeoman usage

```bash
npm install -g yo @hackney/generator-mfe
yo @hackney/mfe
```

The generator scaffolds a React single-spa micro-frontend with Hackney defaults (webpack,
TypeScript, ESLint, Prettier, Jest, Cypress wiring, and `@mtfh/common` integration).

## Linked versioning

`@hackney/generator-mfe` and `@hackney/create-mfe` are versioned together via Release
Please linked versions. See the root [README](../../README.md).
