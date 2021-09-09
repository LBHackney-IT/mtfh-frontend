import React from "react";
import { testA11y } from "@hackney/mtfh-test-utils";
import { render } from "@testing-library/react";

import { Spinner } from "./spinner";

test("it renders correctly", async () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
