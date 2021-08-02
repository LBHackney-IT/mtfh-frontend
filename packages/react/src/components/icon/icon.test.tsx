import React from "react";
import { render } from "@testing-library/react";
import { testA11y } from "@lbh-mtfh/test-utils";

import { Icon } from "./icon";

test("it renders a icon with defaults", async () => {
  const { container } = render(
    <Icon viewBox="0 0 200 200">
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a icon with inline color", () => {
  const { container } = render(
    <Icon viewBox="0 0 200 200" color="red">
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
  expect(container).toMatchSnapshot();
});
