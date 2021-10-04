---
"@hackney/mtfh-cli": major
---

mtfh-cli v2 Release

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
