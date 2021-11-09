declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface cy {
      authVisit: typeof authVisit;
      guestVisit: typeof guestVisit;
      hasToggle: typeof hasToggle;
      skipOnEnv: typeof skipOnEnv;
      skipOnToggle: typeof skipOnToggle;
    }
    interface Options {
      actions?: string[];
      headers?: object;
      hideElements?: string;
      ignore?: string[];
      ignoreUrl?: boolean;
      includeNotices?: boolean;
      includeWarnings?: boolean;
      level?: string;
      method?: string;
      postData?: string;
      reporter?: string;
      rootElement?: string;
      runners?: string[];
      rules?: string[];
      screenCapture?: string;
      standard?: AccessibilityStandard;
      threshold?: number;
      timeout?: number;
      userAgent?: string;
      wait?: number;
    }

    interface LighthouseThresholds {
      performance?: number;
      accessibility?: number;
      "best-practices"?: number;
      seo?: number;
      pwa?: number;
      "first-contentful-paint"?: number;
      "largest-contentful-paint"?: number;
      "first-meaningful-paint"?: number;
      "load-fast-enough-for-pwa"?: number;
      "speed-index"?: number;
      "estimated-input-latency"?: number;
      "max-potential-fid"?: number;
      "server-response-time"?: number;
      "first-cpu-idle"?: number;
      interactive?: number;
      "mainthread-work-breakdown"?: number;
      "bootup-time"?: number;
      "network-rtt"?: number;
      "network-server-latency"?: number;
      metrics?: number;
      "uses-long-cache-ttl"?: number;
      "total-byte-weight"?: number;
      "dom-size"?: number;
    }
    interface Chainable<Subject> {
      pa11y(opts?: Options): Cypress.Chainable<Subject>;
      lighthouse(
        thresholds?: LighthouseThresholds,
        opts?: any,
        config?: any,
      ): Cypress.Chainable<Subject>;
      guestVisit(url: string, options?: Cypress.VisitOptions): Cypress.Chainable<Subject>;
      authVisit(url: string, options?: Cypress.VisitOptions): Cypress.Chainable<Subject>;
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

// @ts-ignore "cy.state" is not in the "cy" type
const getContext = () => cy.state("runnable");
const skip = () => {
  const ctx = getContext();
  try {
    ctx.skip();
  } catch {
    // no-op
  }
};

const skipOnToggle = (toggle: string, expect: boolean) => {
  hasToggle(toggle).then((bool) => {
    if (bool === expect) {
      cy.log(`Skipping test with ${toggle}`);
      return skip();
    }
  });
};

const skipOnEnv = (target: string) => {
  const env = Cypress.env("ENVIRONMENT") || "development";
  if (env === target) {
    cy.log(`Skipping test with ${env}`);
    return skip();
  }
};

Cypress.Commands.add("authVisit", authVisit);
Cypress.Commands.add("guestVisit", guestVisit);
Cypress.Commands.add("hasToggle", hasToggle);
Cypress.Commands.add("skipOnEnv", skipOnEnv);
Cypress.Commands.add("skipOnToggle", skipOnToggle);

export {};
