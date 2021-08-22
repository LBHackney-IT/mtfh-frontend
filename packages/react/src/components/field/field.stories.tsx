import React from "react"
import { Formik } from "formik"

import { Input } from "../input"
import { Radio, RadioGroup } from "../radios"
import { Field } from "./field"

export default {
  title: "Formik/Field",
  component: Field,
}

export const Base = () => {
  return (
    <Formik initialValues={{ text: "" }} onSubmit={() => {}}>
      <Field id="text" label="Text Label" name="text">
        <Input />
      </Field>
    </Formik>
  )
}

export const FieldWithRadioGroup = () => {
  return (
    <Formik initialValues={{ choice: "" }} onSubmit={() => {}}>
      <Field id="text" label="Radio Label" name="choice" type="radio">
        <RadioGroup>
          <Radio id="choice-1" value="1">
            Choice 1
          </Radio>
          <Radio id="choice-2" value="2">
            Choice 2
          </Radio>
          <Radio id="choice-3" value="3">
            Choice 3
          </Radio>
        </RadioGroup>
      </Field>
    </Formik>
  )
}
