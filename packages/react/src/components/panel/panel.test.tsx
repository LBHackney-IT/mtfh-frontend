import React from "react"
import { testA11y } from "@hackney/mtfh-test-utils"
import { render, screen } from "@testing-library/react"

import { Panel } from "./panel"

test("it renders correctly", async () => {
  const { container } = render(<Panel />)
  expect(container).toMatchSnapshot()
  await testA11y(container)
})

test("it shows a title", () => {
  const TITLE_TEXT = "A title"
  render(<Panel titleText={TITLE_TEXT} />)
  expect(screen.getByText(TITLE_TEXT))
})

test("it shows a title that its polymorphic", () => {
  const TITLE_TEXT = "A title"
  const TITLE_TYPE = "h2"
  const { container } = render(
    <Panel titleText={TITLE_TEXT} headingElementType={TITLE_TYPE} />,
  )
  expect(container).toMatchSnapshot()
})

test("it shows a body", () => {
  const BODY_TEXT = "A title"
  render(<Panel bodyText={BODY_TEXT} />)
  expect(screen.getByText(BODY_TEXT))
})
