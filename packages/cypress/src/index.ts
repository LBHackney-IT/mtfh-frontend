import "cypress-audit/commands";
import "./commands";
import "@testing-library/cypress";
import "@testing-library/cypress/add-commands";
import "./hooks";
import terminalReport from "cypress-terminal-report/src/installLogsCollector";

terminalReport();
