import React from "react"
import { testA11y } from "@hackney/mtfh-test-utils"
import { render } from "@testing-library/react"

import { FormGroup } from "../form-group"
import { DateInput } from "./date-input"

test("it passes a11y", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="DateInput Test">
      <DateInput id="date-input" />
    </FormGroup>,
  )
  expect(container).toMatchSnapshot()
  await testA11y(container)
})

test("it renders correctly", () => {
  const { container } = render(<DateInput id="date-input" />)
  expect(container).toMatchSnapshot()
})
