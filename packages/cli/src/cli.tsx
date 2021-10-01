#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const cli = meow(
  `
	Usage
    $ mtfh-cli
    Starts all Micro-frontends

	Usage
	  $ mtfh-cli search person
    Starts all required and named Micro-frontends
`,
  {
    flags: {
      name: {
        type: "string",
      },
    },
  },
);

render(<App scope={cli.input} />);
