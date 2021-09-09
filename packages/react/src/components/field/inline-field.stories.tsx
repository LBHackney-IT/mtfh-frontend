import React from "react";
import { Formik } from "formik";

import { Input } from "../input";
import { InlineField } from "./field";

export default {
  title: "Formik/Inline Field",
  component: InlineField,
};

export const Base = () => {
  return (
    <Formik initialValues={{ text: "" }} onSubmit={() => {}}>
      <InlineField name="text">
        <Input />
      </InlineField>
    </Formik>
  );
};
