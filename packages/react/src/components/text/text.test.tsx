import React from "react";
import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Text } from "./text";

test("it renders the text", async () => {
  const { container } = render(<Text>Text</Text>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
