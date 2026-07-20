import pa11yLib from "pa11y";
import puppeteer from "puppeteer";

type AuditGlobal = typeof globalThis & {
  cypress_audit_port?: string;
};

interface Pa11yTaskInput {
  url: string;
  opts?: Record<string, unknown>;
}

export const pa11y =
  () =>
  async ({ url, opts }: Pa11yTaskInput) => {
    const auditGlobal = global as AuditGlobal;

    if (!auditGlobal.cypress_audit_port) {
      throw new Error(
        "The Cypress debugging port could not be resolved. Ensure prepareAudit is called in before:browser:launch.",
      );
    }

    const browser = await puppeteer.connect({
      browserURL: `http://localhost:${auditGlobal.cypress_audit_port}`,
    });

    try {
      const results = await pa11yLib(url, { browser, runners: ["axe"], ...opts });
      return results.issues ?? [];
    } finally {
      browser.disconnect();
    }
  };
