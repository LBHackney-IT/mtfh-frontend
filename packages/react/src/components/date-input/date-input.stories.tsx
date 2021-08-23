import React from "react"

import { FormGroup } from "../form-group"
import { DateInput } from "./date-input"

export default {
  title: "Date Input",
  component: DateInput,
}

export const Base = () => {
  return <DateInput id="date-input" />
}

export const DateInputWithError = () => {
  return (
    <FormGroup
      as="fieldset"
      id="date-input"
      label="Date of Birth"
      error="Date cannot be in the future"
      required
    >
      <DateInput
        dayProps={{ error: true }}
        monthProps={{ error: true }}
        yearProps={{ error: true }}
      />
    </FormGroup>
  )
}

export const DateInputWithSingleError = () => {
  return (
    <FormGroup
      id="date-input"
      label="Date of Birth"
      error="Date cannot be in the future"
    >
      <DateInput yearProps={{ error: true }} />
    </FormGroup>
  )
}
