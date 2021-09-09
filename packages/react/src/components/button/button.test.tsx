import React from "react";
import { testA11y } from "@hackney/mtfh-test-utils";
import { render, screen } from "@testing-library/react";

import { Button } from "./button";

test("it renders correctly", async () => {
  const { container } = render(<Button>Test Button</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it shows a loading state", async () => {
  const { container } = render(<Button isLoading>Test Button</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it shows a loading state with custom text", () => {
  render(
    <Button isLoading loadingText="Processing">
      Test Button
    </Button>,
  );
  expect(screen.getByText("Processing")).toBeInTheDocument();
});

test("it renders the correct variant", async () => {
  const { container } = render(<Button variant="secondary">Test Link</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it does not set the type when it is used polymorphically", () => {
  render(<Button as="span">Test Button</Button>);
  const button = screen.getByText("Test Button");
  expect(button).not.toHaveAttribute("type");
});
