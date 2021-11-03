/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface cy {
      skip: typeof skip;
      skipOnToggle: typeof skipOnToggle;
      skipOnEnv: typeof skipOnEnv;
    }
    interface Chainable {
      guestVisit(url: string, options?: Cypress.VisitOptions): Cypress.Chainable<any>;
      authVisit(url: string, options?: Cypress.VisitOptions): Cypress.Chainable<any>;
      hasToggle(toggle: string): Cypress.Chainable<boolean>;
    }
  }
}

const authVisit = (url: string, options?: Cypress.VisitOptions) => {
  const token = Cypress.env("AUTH_TOKEN");
  cy.setCookie("hackneyToken", token);
  cy.getCookie("hackneyToken").should("have.property", "value", token);
  cy.visit(url, options);
  cy.get(".container-max-width").should("not.be.empty");
};

const guestVisit = (url: string, options?: Cypress.VisitOptions) => {
  cy.clearCookie("hackneyToken");
  cy.visit(url, options);
  cy.get(".container-max-width").should("not.be.empty");
};

const hasToggle = (toggle: string) => {
  return cy.fixture("feature-toggles.json").then((toggles) => {
    cy.log("toggles", toggles);
    const pathArray = toggle.match(/([^[.\]])+/g);
    const result =
      pathArray?.reduce((prevObj, key): any => {
        if (prevObj && prevObj[key]) {
          return prevObj[`${key}`];
        }
        return false;
      }, toggles) || false;
    const bool = typeof result === "boolean" ? result : false;
    return cy.wrap(bool);
  });
};

const skip = () => {
  // @ts-ignore "cy.state" is not in the "cy" type
  const ctx = cy.state("runnable").ctx;
  ctx.skip();
};

const skipOnToggle = (toggle: string, expect: boolean) => {
  hasToggle(toggle).then((bool) => {
    if (bool === expect) {
      cy.log(`Skipping test with ${toggle}`);
      // @ts-ignore "cy.state" is not in the "cy" type
      cy.skip();
    }
  });
};

const skipOnEnv = (target: string) => {
  const env = Cypress.env("ENVIRONMENT") || "development";
  if (env === target) {
    cy.skip();
  }
};

Cypress.Commands.add("authVisit", authVisit);
Cypress.Commands.add("guestVisit", guestVisit);
Cypress.Commands.add("hasToggle", hasToggle);
Cypress.Commands.add("skip", skip);
Cypress.Commands.add("skipOnEnv", skipOnEnv);
Cypress.Commands.add("skipOnToggle", skipOnToggle);

export {};
