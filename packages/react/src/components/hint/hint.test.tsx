import React from "react";
import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Hint } from "./hint";

test("it renders the hint", async () => {
  const { container } = render(<Hint>Hint</Hint>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
