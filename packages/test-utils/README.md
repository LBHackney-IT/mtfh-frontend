# `test-utils`

Testing utilities for Jest utilising the `@testing-library` and `mws` frameworks.

## Usage

Add the lib to jest config:

```ts
setupFilesAfterEnv: ["@testing-library/jest-dom", "@hackney/mtfh-test-utils"],
```

## Render

You should always prefer to use the render method from this library when testing.

```tsx
import { render } from "@hackney/mtfh-test-utils";
```

### React Router Dom

The `render` method wraps tests in our custom `ConfirmationRouter`
([see here](https://github.com/LBHackney-IT/mtfh-frontend-common/blob/main/lib/components/confirmation-router/confirmation-router.tsx))

```tsx
render(<PageView />);
```

If your page requires path params to be defined, ie your component utilises `useParams`,
`useLocation` etc, from `react-router-dom`.

```tsx
render(<PageView />, {
  url: "/person/b7ab8dd3-b200-40b0-98e0-324781ec0832",
  path: "/person/:personId",
});
```

### Media Queries

To render the view at a specific device size, you can initialise the options with one of
the defined values.

```tsx
render(<Button />, { query: "sm" });
```

The accepted
[queries](https://github.com/LBHackney-IT/mtfh-frontend/blob/main/packages/system/src/breakpoints.ts)
are defined as the following:

```tsx
const queries = {
  base: "(min-width: 0px) and (max-width: 479px)",
  sm: "(min-width: 480px) and (max-width: 767px)",
  md: "(min-width: 768px) and (max-width: 991px)",
  lg: "(min-width: 992px) and (max-width: 1279px)",
  xl: "(min-width: 1280px) and (max-width: 1535px)",
  "2xl": "(min-width: 1536px)",
};
```

## Testing Accessibility

We expose a helper to test a dom/react element for accessibility using `jest-axe`

```tsx
import { render, testA11y } from "@hackney/mtfh-test-utils";

test("it passes a11y", async () => {
  const { container } = render(<Button />);
  await testA11y(container);
});
```

Or directly

```tsx
import { testA11y } from "@hackney/mtfh-test-utils";

test("it passes a11y", async () => {
  await testA11y(<Button />);
});
```

### Options

You can pass both render and axe configuration to the second argument as described in
[jest-axe](https://github.com/nickcolley/jest-axe#axe-configuration).

```tsx
await testA11y(<Button />, {
    query: 'sm',
    axeOptions: {
        rules: {
            'color-contrast': { enabled: true }
        }
    }
);
```

## API Mocks and Handlers

The library exposes a msw node server, with no existing handlers defined:

```ts
import { server } from "@hackney/mtfh-test-utils";
```

### Default Api Handlers

To add any of the versioned api handlers create a `test-utils.ts` file in your project and
define the following:

```ts
import { server, getPersonV1, getCommentsV2 } from "@hackney/mtfh-test-utils";

beforeEach(() => {
  server.use(getPersonV1(), getCommentsV2());
});
```

NB: Don't forget to add your `test-utils.ts` file to the `setupFilesAfterEnv` option in
`jest.config.ts`.

### Override Handlers

When testing components that use any api, you should be testing failures. To do so simply
define the usage before the render:

```tsx
import { render, server, getPersonV1 } from "@hackney/mtfh-test-utils";

test("it handles an unexpected error", async () => {
  server.use(getPersonV1("error", 500));
  render(<PersonView />, {
    url: "/person/b7ab8dd3-b200-40b0-98e0-324781ec0832",
    path: "/person/:personId",
  });
});
```

### Using Mocks

This library exposes helpers (using faker) to help generate mock data.

```ts
import { generateMockPersonV1 } from "@hackney/mtfh-test-utils";

const mockPerson = generateMockPersonV1({
  firstName: "Test",
});
```

We also expose pre-generated mocks for usage with handlers. View the relevant api to see
what is there.
