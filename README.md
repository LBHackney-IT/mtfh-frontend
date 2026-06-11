# `mtfh-frontend`

This monorepo contains various reusable packages, originally built to facilitate repition
within MTFH's micro-frontend architecture.

## Requirements

- **Node.js 24+** (see [`.nvmrc`](.nvmrc))
- **npm** (workspaces)

## Architecture

The monorepo uses a combination of `lerna` and `npm workspaces` to manage the packages and
their dependencies. If either are new to you, it would be good to read up on them
specifically, especially how npm manages and hoists dependencies in a workspace.

We use [Release Please](https://github.com/googleapis/release-please) to manage
versioning, changelogs, and publishing to npm — following the same pattern as
[lbh-frontend](https://github.com/LBHackney-IT/lbh-frontend/tree/develop/.github).

Our deployments are managed through GitHub Actions.

## Getting Started

Install dependencies from the root of the monorepo:

```bash
npm ci
```

For tests to pass you will need some packages built:

```bash
npm run build
```

## Exploring

Look through the various `packages/*` in this monorepo and their detaild Readmes.

## Contributing

1. Make changes in any/all the packages you need.
2. Use [Conventional Commits](https://www.conventionalcommits.org/) in PR titles and
   commit messages (`feat:`, `fix:`, `chore:`, etc.) so Release Please can determine
   version bumps and changelog entries.
3. Raise a PR to `main`. CI runs build, lint, and tests.
4. After merge, [Release Please](.github/workflows/release-please.yml) opens or updates a
   release PR with version bumps and `CHANGELOG.md` updates for affected packages.
5. Release PRs are validated by
   [release-pr-build.yml](.github/workflows/release-pr-build.yml) (build, lint, test).
6. Merge the release PR to `main`. Release Please tags the release and the publish
   workflow builds packages and publishes to npm.

`@hackney/create-mfe` and `@hackney/generator-mfe` are versioned together (linked in
`release-please-config.json`).

### Repository secrets

Release automation requires these GitHub Actions secrets (same GitHub App pattern as
lbh-frontend):

- `RELEASE_PLEASE_APP_ID`
- `RELEASE_PLEASE_PRIVATE_KEY`
- `NPM_TOKEN`
