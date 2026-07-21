# `@hackney/eslint-config`

ESLint config for TypeScript and React projects.

Requires **ESLint 8**, **typescript-eslint 7**, and **Prettier 3** peer dependencies (see
Installation).

## Installation

```bash
npm install -D @hackney/eslint-config
```

Install the peer dependencies (versions should satisfy the ranges declared by this
package):

```bash
npm install -D \
  eslint@^8.57.0 \
  @typescript-eslint/eslint-plugin@^7.18.0 \
  @typescript-eslint/parser@^7.18.0 \
  eslint-config-airbnb@^19.0.4 \
  eslint-config-airbnb-typescript@^18.0.0 \
  eslint-config-prettier@^9.1.0 \
  eslint-config-react@^1.1.7 \
  eslint-plugin-import@^2.31.0 \
  eslint-plugin-jest@^28.9.0 \
  eslint-plugin-jsx-a11y@^6.10.2 \
  eslint-plugin-prettier@^5.2.1 \
  eslint-plugin-react@^7.37.2 \
  eslint-plugin-react-hooks@^5.0.0 \
  eslint-plugin-testing-library@^6.4.0 \
  prettier@^3.4.0
```

## Usage

For React-based projects, configure a `.eslintrc` file:

```json
{
  "extends": "@hackney/eslint-config"
}
```

For non-React TypeScript projects:

```json
{
  "extends": "@hackney/eslint-config/base"
}
```
