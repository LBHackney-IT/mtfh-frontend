const {
  authVisit,
  guestVisit,
  hasToggle,
  skip,
  skipOnEnv,
  skipOnToggle,
} = require("./dist/commands");

Cypress.Commands.add("authVisit", authVisit);
Cypress.Commands.add("guestVisit", guestVisit);
Cypress.Commands.add("hasToggle", hasToggle);
Cypress.Commands.add("skip", skip);
Cypress.Commands.add("skipOnEnv", skipOnEnv);
Cypress.Commands.add("skipOnToggle", skipOnToggle);
