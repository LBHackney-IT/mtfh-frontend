# `@hackney/mtfh-react`

LBH React design-system components for Modern Tools for Housing. Built on
[lbh-frontend](https://github.com/LBHackney-IT/lbh-frontend) / GOV.UK Frontend styles and
patterns.

## Installation

```bash
npm install @hackney/mtfh-react
```

Peer dependencies (install in the consuming app):

```bash
npm install react react-dom react-router-dom formik
```

Supported React versions: **17 | 18 | 19**. React Router **5** is required.

## Usage

Import the global reset once (usually in your app entry):

```ts
import "@hackney/mtfh-react/reset.css";
```

Then use components:

```tsx
import { Button, Dialog, Heading, Layout } from "@hackney/mtfh-react";

export const Example = () => (
  <Layout>
    <Heading variant="h1">Hello</Heading>
    <Button>Continue</Button>
  </Layout>
);
```

### Dialog

```tsx
import { Dialog, DialogActions, Button } from "@hackney/mtfh-react";

<Dialog isOpen={open} onDismiss={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>;
```

## Local development

From the monorepo root:

```bash
npm ci
npm run build
npm run storybook
```

Storybook stories live under `packages/react/src/components/**/*.stories.tsx`.
