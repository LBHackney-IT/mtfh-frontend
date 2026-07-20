import lighthouseLib from "lighthouse/core/index.cjs";

import { compareWithThresholds, computeAudits, computeCategories } from "./helpers";

interface LighthouseTaskInput {
  url: string;
  thresholds: Record<string, number>;
  opts?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

type AuditGlobal = typeof globalThis & {
  cypress_audit_port?: string;
};

export const lighthouse =
  () =>
  ({ url, thresholds, opts = {}, config }: LighthouseTaskInput) => {
    const auditGlobal = global as AuditGlobal;

    if (!auditGlobal.cypress_audit_port) {
      throw new Error(
        "The Cypress debugging port could not be resolved. Ensure prepareAudit is called in before:browser:launch.",
      );
    }

    const options = {
      ...opts,
      port: Number(auditGlobal.cypress_audit_port),
      onlyCategories: opts.onlyCategories ?? Object.keys(thresholds),
      disableStorageReset: opts.disableStorageReset ?? true,
    };

    return lighthouseLib.legacyNavigation(url, options, config).then((results) => {
      const computedAudits = computeAudits(results.lhr.audits);
      const computedCategories = computeCategories(results.lhr.categories);

      return compareWithThresholds(
        { ...computedAudits, ...computedCategories },
        thresholds,
      );
    });
  };
