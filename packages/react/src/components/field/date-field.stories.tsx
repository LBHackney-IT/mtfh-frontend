import React from "react"
import { Formik } from "formik"

import { DateField } from "./field"

export default {
  title: "Formik/Date Field",
  component: DateField,
}

export const Base = () => {
  return (
    <Formik initialValues={{ text: "" }} onSubmit={() => {}}>
      <DateField
        id="dob"
        label="Date of Birth"
        dayProps={{ name: "dobDay" }}
        monthProps={{ name: "dobMonth" }}
        yearProps={{ name: "dobYear" }}
      />
    </Formik>
  )
}
