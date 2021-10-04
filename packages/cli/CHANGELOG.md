# @hackney/mtfh-cli

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
