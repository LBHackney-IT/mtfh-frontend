declare module "cypress-audit" {
  export function pa11y(cb: (results: string) => void): () => Promise<unknown[]>;
  export function lighthouse(
    cb: (results: string) => void,
  ): () => Promise<unknown | null>;
  export function prepareAudit(launchOptions: Cypress.BrowserLaunchOptions): void;
}
