import terminalReport from "cypress-terminal-report/src/installLogsCollector";

import lighthouseCommandHandler from "./audit/lighthouse-command";
import pa11yCommandHandler from "./audit/pa11y-command";

import "./commands";
import "@testing-library/cypress";
import "@testing-library/cypress/add-commands";
import "./hooks";

Cypress.Commands.add("lighthouse", lighthouseCommandHandler);
Cypress.Commands.add("pa11y", pa11yCommandHandler);

terminalReport();
