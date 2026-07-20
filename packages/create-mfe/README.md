# `@hackney/create-mfe`

Scaffolding utilities for Hackney micro-frontends.

Requires **Node.js 24+**.

## Installation

```bash
npx @hackney/create-mfe
```

Optionally pass a path for the new app directory:

```bash
npx @hackney/create-mfe my-app
```

## Usage

The current scaffolding utilities are:

1. **Application** — create a new React micro-frontend application.
2. **Upgrade** — upgrade an existing application's dependencies to the latest specified
   versions.

Under the hood this wraps [`@hackney/generator-mfe`](../generator). You can also use
`mtfh-cli new` / `mtfh-cli upgrade`.

## Linked versioning

`@hackney/create-mfe` and `@hackney/generator-mfe` are versioned together via Release
Please linked versions. See the root [README](../../README.md).
