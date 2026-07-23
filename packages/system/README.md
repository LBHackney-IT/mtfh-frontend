# `@hackney/mtfh-system`

Shared design tokens and breakpoint helpers for Modern Tools for Housing front-ends.

## Installation

```bash
npm install @hackney/mtfh-system
```

## Usage

```ts
import { BREAKPOINTS, breakpoints, queries } from "@hackney/mtfh-system";

BREAKPOINTS.md; // 768
queries.md; // "(min-width: 768px) and (max-width: 991px)"
breakpoints.get("lg"); // 992
```

### Breakpoints

| Key  | Min width (px) |
| ---- | -------------- |
| base | 0              |
| sm   | 480            |
| md   | 768            |
| lg   | 992            |
| xl   | 1280           |
| 2xl  | 1536           |

`queries` maps each key to a CSS media-query string used by `@hackney/mtfh-react` hooks
and `@hackney/mtfh-test-utils` render helpers.
