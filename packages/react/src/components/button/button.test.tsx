import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";

import { testA11y } from "@lbh-mtfh/test-utils";
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
    </Button>
  );
  expect(screen.getByText("Processing")).toBeInTheDocument();
});

test("it renders the correct variant", async () => {
  const { container } = render(<Button variant="secondary">Test Link</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it accepts a ref", () => {
  const callback = jest.fn();
  const Comp = () => {
    const ref = React.createRef<HTMLButtonElement>();

    useEffect(() => {
      if (ref.current) {
        callback(ref.current);
      }
    }, [ref]);
    return <Button ref={ref}>Test Button</Button>;
  };
  render(<Comp />);
  expect(callback).toBeCalledTimes(1);
});
