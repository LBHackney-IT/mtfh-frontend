# @hackney/mtfh-cli

## [2.1.4](https://github.com/LBHackney-IT/mtfh-frontend/compare/@hackney/mtfh-cli-v2.1.3...@hackney/mtfh-cli-v2.1.4) (2026-07-23)


### Bug Fixes

* **ci:** harden OIDC publish metadata and run publish once ([fdab486](https://github.com/LBHackney-IT/mtfh-frontend/commit/fdab486cfb3a171fe38e2b35c5010a236db2d945))
* **ci:** harden OIDC publish metadata and run publish once ([20aaa3c](https://github.com/LBHackney-IT/mtfh-frontend/commit/20aaa3ca377640c418585b39d303571474c5ff37))

## [2.1.3](https://github.com/LBHackney-IT/mtfh-frontend/compare/@hackney/mtfh-cli-v2.1.2...@hackney/mtfh-cli-v2.1.3) (2026-07-23)


### Bug Fixes

* clarify package README descriptions across the monorepo ([fe0b692](https://github.com/LBHackney-IT/mtfh-frontend/commit/fe0b692140b94ce1ca4dd6d99828af9ba1c75471))
* clarify package README descriptions across the monorepo ([dde5243](https://github.com/LBHackney-IT/mtfh-frontend/commit/dde5243f90e9d29cc3ae0ab44421e0f38dec232c))

## [2.1.2](https://github.com/LBHackney-IT/mtfh-frontend/compare/@hackney/mtfh-cli@2.1.1...@hackney/mtfh-cli-v2.1.2) (2026-07-20)


### Bug Fixes

* **mtfh-cli:** correct subject-verb agreement in register docs ([dc64ab9](https://github.com/LBHackney-IT/mtfh-frontend/commit/dc64ab9ce45e3f80bfdae30d295e31e2caded301))
* **mtfh-cli:** correct subject-verb agreement in register docs ([3a550ef](https://github.com/LBHackney-IT/mtfh-frontend/commit/3a550ef3444124c40419a51a8c7bd27356ea8041))

## 2.1.1

### Patch Changes

- f5d1479: Eslint improvements

## 2.1.0

### Minor Changes

- da69d96: Update generator dependencies and include in cli

## 2.0.1

### Patch Changes

- 36bb8be: Remove memory leak is useParallel where child process were spawned multiple
  times.

## 2.0.0

### Major Changes

- a95e9cb: mtfh-cli v2 Release

  Commands available:

  ## install

  Using the github api to automatically discover available apps, we facilitate cloning and
  dependency installation.

  ## run [...scope]

  Runs the registered apps as child processes. The scope can be used as a partial match on
  the registered apps names.

  For example:

  ```bash
  $ mtfh-cli run
  $ mtfh-cli run tenure search
  $ mtfh-cli run mtfh
  ```

  ## new [path]

  Creates a new Micro-frontend using the `@hackney/generator-mfe` application. Instead of
  having the above package as a dependency, we use `npx`.

  ## register [path]

  Look in the designated path for mfe compliant projects to register them. This makes them
  available for `mtfh-cli run`. Useful for projects predating the cli.

### Patch Changes

- 2ee7541: Remove console.log and chalk the help to make it more readable
- Updated dependencies [a95e9cb]
  - @hackney/generator-mfe@1.1.7

## 1.0.2

### Patch Changes

- a9a45cb: Fix child processes spawning on Windows OS

## 1.0.1

### Patch Changes

- cdea5c8: Pretty output and error when packages are not in scope

## 1.0.0

### Major Changes

- 84245cc: Intital release for generators
