import React from "react";
import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Layout } from "./layout";

test("it renders correctly", async () => {
  const { container } = render(
    <Layout side={<div id="side">Side Bar</div>} top={<div id="top">Top</div>}>
      <div id="main">Main</div>
    </Layout>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly without a side", () => {
  const { container } = render(
    <Layout>
      <div id="main">Main</div>
    </Layout>,
  );
  expect(container).toMatchSnapshot();
});
