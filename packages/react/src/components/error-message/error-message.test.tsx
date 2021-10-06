import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { ErrorMessage } from "./error-message";

test("it renders the error message", async () => {
  const { container } = render(<ErrorMessage>Error</ErrorMessage>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
