import React from "react";
import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Label } from "./label";

test("it renders the label", async () => {
  const { container } = render(
    <>
      <Label htmlFor="input">Label</Label>
      <input id="input" />
    </>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
