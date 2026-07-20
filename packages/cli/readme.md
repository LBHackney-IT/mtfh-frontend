# `@hackney/mtfh-cli`

A CLI to help manage micro-frontend orchestration for MTFH.

Requires **Node.js 24+**.

## Install

```bash
npx @hackney/mtfh-cli
npm install -g @hackney/mtfh-cli
```

## CLI

```
Usage
  $ mtfh-cli <command>

Commands
  - install
  - new [directory]
  - run [...apps]
  - register [directory]
  - upgrade

Examples
  $ mtfh-cli new mtfh-frontend-project
    - Starts scaffolding in a new folder in cwd called mtfh-frontend-project
  $ mtfh-cli run
    - Starts only the required apps
  $ mtfh-cli run search tenure
    - Starts the required apps, plus mtfh-frontend-search and mtfh-frontend-tenure
  $ mtfh-cli run mtfh
    - Starts the required apps, plus all apps prefixed with mtfh (most if not all)
```

## Requirements

- **Node.js 24+** — https://nodejs.org/
- **GitHub Personal Access Token** —
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- **npm** (workspaces). Some existing MTFH frontend apps may still use Yarn; the CLI
  detects `yarn.lock` vs `package-lock.json` when installing dependencies in those
  projects.

## Commands

### Install

Install existing micro-frontends into a given directory. All microfrontends are prefixed
with `mtfh-frontend-`.

- Follow the prompts by adding and securing your GitHub personal access token.
- Select the micro-frontends you want to add, using the arrow keys and space to select.
  Enter to confirm.
- The repos will be git cloned; some repos may be private so make sure you have git SSH
  configured in a terminal.
- Optionally install all project dependencies.

This step will create a `.mtfh` config folder in your home folder. An encrypted version of
your access token is stored in `.mtfh/config.json`. Feel free to delete. All registered
micro-frontends are stored in `.mtfh/app.json`.

### Run

Orchestrates micro-frontends to start developing locally. Not all micro-frontends need to
run for you to be able to start working on a piece of functionality. We enforce a few as
required: Root, Auth, Header, and Common.

The `run` command accepts multiple arguments to help you spin up the right
micro-frontends. The arguments simply get pattern matched to the registered
micro-frontend's name.

#### Run only the required

```
mtfh-cli run
```

#### Run all the required, and search and tenure

```
mtfh-cli run search tenure
```

#### Run all registered micro-frontends

```
mtfh-cli run mtfh
```

### Register

If you manually create or clone a project, it won't automatically be registered with the
CLI. This command helps add it so it can be available in `run`.

### New

Creates and registers a micro-frontend using the Yeoman generator. See
`packages/generator`.

### Upgrade

A shortcut to our Yeoman generator that makes sure all the micro-frontend's dependencies
match the defined state. See `packages/generator`.
