import React from "react"
import { testA11y } from "@hackney/mtfh-test-utils"
import { render, screen } from "@testing-library/react"

import { Accordion, AccordionItem } from "./accordion"

test("it passes a11y", async () => {
  const { container } = render(
    <Accordion id="test">
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  )

  expect(container).toMatchSnapshot()
  await testA11y(container)
})

test("it renders correctly", () => {
  render(
    <Accordion id="test">
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  )

  expect(screen.getAllByRole("heading")).toHaveLength(2)
  expect(screen.getByText("Test")).toBeInTheDocument()
})
