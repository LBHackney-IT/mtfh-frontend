describe("Config plugin", () => {
  it("loads correct env json", () => {
    expect(Cypress.env()).to.have.property("AUTH_TOKEN", "development-token");
  });
});

describe("skipOnToggle skips", () => {
  before(() => {
    cy.skipOnToggle("test.feature", true);
  });
  it("skips the test", () => {
    throw new Error("Test should be skipped");
  });
});

describe("skipOnToggle runs if no match", () => {
  before(() => {
    cy.skipOnToggle("test.feature", false);
  });
  it("runs the test", () => {
    expect(true).to.equal(true);
  });
});

describe("skipOnEnv skips", () => {
  before(() => {
    cy.skipOnEnv("development");
  });
  it("skips the test", () => {
    throw new Error("Test should be skipped");
  });
});

describe("skipOnEnv runs if no match", () => {
  before(() => {
    cy.skipOnEnv("production");
  });
  it("runs the test", () => {
    expect(true).to.equal(true);
  });
});

describe("hasToggle", () => {
  it("returns value of toggle", () => {
    cy.hasToggle("test.feature").then((bool) => {
      expect(bool).to.equal(true);
    });
  });

  it("returns false of non-existant toggle", () => {
    cy.hasToggle("test.toggle").then((bool) => {
      expect(bool).to.equal(false);
    });
  });
});

describe("visits", () => {
  it("adds hackneyToken creds to authVisit", () => {
    cy.authVisit("/");
    cy.getCookie("hackneyToken").should("have.property", "value", "development-token");
  });

  it("removes hackneyToken with unauthVisit", () => {
    cy.unauthVisit("/");
    cy.getCookie("hackneyToken").should("be.null");
  });
});
