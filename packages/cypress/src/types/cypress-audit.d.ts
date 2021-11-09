declare module "cypress-audit" {
  export function pa11y(cb: (results: any) => void): () => Promise<any[]>;
  export function lighthouse(cb: (results: any) => void): () => Promise<any | null>;
  export function prepareAudit(launchOptions: Cypress.BrowserLaunchOptions): void;
}
