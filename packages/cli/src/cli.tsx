#!/usr/bin/env node

import React from "react";
import chalk from "chalk";
import { render } from "ink";
import meow from "meow";

import Install from "./commands/install";
import NewCommand from "./commands/new";
import RegisterCommand from "./commands/register";
import RunCommand from "./commands/run";

const cli = meow(
  `
	Usage
    $ mtfh-cli ${chalk.gray("<command>")}
    
  Commands
    - install
    - new ${chalk.gray("[directory]")}
    - run ${chalk.gray("[...apps]")}
    - register ${chalk.gray("[directory]")}

	Examples
	  $ mtfh-cli new mtfh-frontend-project
   ${chalk.gray(
     "- Starts the scaffolding in a new folder in cwd called mtfh-frontend-project",
   )}
   $ mtfh-cli run
   ${chalk.gray("- Starts only the required apps")}
   $ mtfh-cli run search tenure
   ${chalk.gray(
     "- Starts the required apps, plus mtfh-frontend-search and mtfh-frontend-tenure",
   )}
   $ mtfh-cli run mtfh
   ${chalk.gray(
     "- Starts the required apps, plus all apps prefixed with mtfh (most if not all)",
   )}
`,
);

const [command, ...args] = cli.input;

if (command === "install") {
  render(<Install />);
} else if (command === "new") {
  render(<NewCommand dir={args[0]} />);
} else if (command === "run") {
  render(<RunCommand scopes={args} />);
} else if (command === "register") {
  render(<RegisterCommand dir={args[0]} />);
} else {
  cli.showHelp();
}

// render(<App scope={cli.input} />);
