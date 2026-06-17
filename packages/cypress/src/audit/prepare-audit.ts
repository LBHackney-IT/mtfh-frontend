import type { BrowserLaunchOptions } from "cypress";

type AuditGlobal = typeof globalThis & {
  cypress_audit_port?: string;
};

export const prepareAudit = (launchOptions: BrowserLaunchOptions) => {
  const remoteDebugging = launchOptions.args.find((config) =>
    config.startsWith("--remote-debugging-port"),
  );

  if (remoteDebugging) {
    (global as AuditGlobal).cypress_audit_port = remoteDebugging.split("=")[1];
  } else {
    console.error(
      `[mtfh-cypress]: Could not resolve the browser debugging port. Run tests in a Chromium-based browser, e.g. npx cypress run --browser=chrome`,
    );
  }
};
