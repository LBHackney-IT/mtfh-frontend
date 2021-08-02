import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import { testA11y } from "@lbh-mtfh/test-utils";

import { Link } from "./link";

test("it renders correctly", async () => {
  const { container } = render(
    <Link href="http://localhost">Test Button</Link>
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a variant", () => {
  const { container } = render(
    <Link href="http://localhost" variant="muted">
      Test Button
    </Link>
  );
  expect(container).toMatchSnapshot();
});

test("it renders a back link", () => {
  const { container } = render(
    <Link href="http://localhost" variant="back-link">
      Test Button
    </Link>
  );
  expect(container).toMatchSnapshot();
});

test("it sets the correct attributes on isExternal", async () => {
  const { container } = render(
    <Link href="http://localhost" isExternal>
      Test Button
    </Link>
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
