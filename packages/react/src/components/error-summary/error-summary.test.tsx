import React from "react";
import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { ErrorSummary } from "./error-summary";

test("it renders an alert", async () => {
  const { container } = render(<ErrorSummary id="error" title="Something went wrong" />);
  expect(screen.getByRole("alert")).toBeInTheDocument();
  await testA11y(container);
});

test("it shows a description without children", () => {
  render(
    <ErrorSummary id="error" title="Something went wrong" description="User error" />,
  );
  expect(screen.getByText("User error")).toBeInTheDocument();
});

test("it creates a list of the children", async () => {
  const { container } = render(
    <ErrorSummary id="error" title="Something went wrong">
      <a href="#test">Test</a>
      <a href="#next">Next</a>
    </ErrorSummary>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
