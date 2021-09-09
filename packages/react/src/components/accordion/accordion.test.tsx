import React from "react";
import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";

import { Accordion, AccordionItem } from "./accordion";

test("it passes a11y", async () => {
  const {
    result: { container },
  } = render(
    <Accordion id="test">
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  );

  await waitFor(() => expect(screen.queryAllByRole("button")).toHaveLength(3));
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly", async () => {
  render(
    <Accordion id="test">
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  );

  await waitFor(() => expect(screen.queryAllByRole("button")).toHaveLength(3));

  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getByText("Test")).toBeInTheDocument();
});
