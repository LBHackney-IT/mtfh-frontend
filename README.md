# `mtfh-frontend`

This monorepo contains various reusable packages, originally built to facilitate repition
within MTFH's micro-frontend architecture.

## Architecture

The monorepo uses a combination of `lerna` and `yarn workspaces` to manage the packages
and their dependencies. If either are new to you, it would be good to read up on them
specifically, especially how yarn manages and hoists dependencies in a workspace.

We also utilise `changeset` to manage publishing to `npm`, as it provides clarity on the
changes made as well as allows us to batch changes if necessary.

Our deployments are managed through `Github Actions`.

## Getting Started

Install dependencies from the root of the monorepo:

```bash
yarn
```

For tests to pass you will need some packages built:

```bash
yarn build
```

## Exploring

Look through the various `packages/*` in this monorepo and their detaild Readmes.

## Contributing

1. Make changes in any/all the packages you need.
2. Run `yarn changeset` in the root of the monorepo (can run this as many times as you
   need).
3. Select the packages you want deployed and they version state you're making, i.e. major,
   minor or patch.
4. Write a changelog statement (this produces a Markdown file, so feel free to elaborate
   more in the file).
5. Commit all files including `.changeset` files.
6. Raise a PR of your pushed branch to main.
7. The changeset bot should signal the relevant changes you defined in your PR.
8. Once reviewed and merged, the github action will build files and test.
9. If all tests pass, changeset will either raise or merge into an exisiting PR with the
   name `Version Packages`.
10. Merge this PR to deploy to `npm`.
