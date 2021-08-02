import React from "react";
import { render } from "@testing-library/react";

import { testA11y } from "@lbh-mtfh/test-utils";
import { Center } from "./center";

test("it renders with both vertical and horizontal by default", async () => {
  const { container } = render(
    <Center>
      <div />
    </Center>
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders with vertical only", () => {
  const { container } = render(
    <Center horizontally={false}>
      <div />
    </Center>
  );
  expect(container).toMatchSnapshot();
});

test("it renders with horizontal only", () => {
  const { container } = render(
    <Center vertically={false}>
      <div />
    </Center>
  );
  expect(container).toMatchSnapshot();
});
