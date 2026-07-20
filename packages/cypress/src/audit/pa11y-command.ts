const VALID_BROWSERS: Record<string, boolean> = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

interface Pa11yIssue {
  code: string;
  selector?: string;
  message?: string;
  context?: string;
}

interface GroupedIssue extends Pa11yIssue {
  issueId: string;
  occurrences: number;
  selectors: string[];
}

const groupIssues = (issues: Pa11yIssue[]) => {
  const groupedIssuesDict = issues.reduce<Record<string, GroupedIssue>>(
    (allIssues, { code, selector, ...rest }) => {
      if (allIssues[code]) {
        allIssues[code].occurrences += 1;
      } else {
        allIssues[code] = {
          selectors: [],
          issueId: code,
          occurrences: 1,
          code,
          ...rest,
        };
      }

      if (selector) {
        allIssues[code].selectors.push(selector);
      }

      return allIssues;
    },
    {},
  );

  return Object.values(groupedIssuesDict);
};

const formatIssues = (issues: GroupedIssue[]) =>
  issues
    .map((issue) => {
      const message = issue.message ? `- ${issue.message}` : "";
      const context = issue.context ? `- Context: ${issue.context}` : "";
      const selector =
        issue.selectors.length > 0
          ? `- Selector concerned: "${issue.selectors.join(",")}"`
          : "";
      return `Issue: ${issue.issueId}, # of occurrences: ${issue.occurrences}.
  ${message}
  ${context}
  ${selector}
          `;
    })
    .join("\n\n");

const pa11yCommandHandler = (opts?: Cypress.Options) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.pa11y()",
      `${Cypress.browser.displayName} is not supported. Skipping...`,
    );
  }

  return cy
    .url()
    .then((url) => cy.task("pa11y", { url, opts }))
    .then((issues) => {
      const issueList = issues as Pa11yIssue[];

      if (issueList.length > 0) {
        const groupedIssues = groupIssues(issueList);
        const title =
          issueList.length === 1
            ? `cy.pa11y - ${issueList.length} accessibility violation was found`
            : `cy.pa11y - ${issueList.length} accessibility violations were found`;
        const formattedIssues = formatIssues(groupedIssues);

        if (opts?.threshold && issueList.length < opts.threshold) {
          cy.log(`${title}\n\n${formattedIssues}`);
        } else {
          throw new Error(`${title}\n\n${formattedIssues}`);
        }
      }
    });
};

export default pa11yCommandHandler;
