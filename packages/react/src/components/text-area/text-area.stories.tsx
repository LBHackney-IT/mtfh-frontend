import React from "react";

import { FormGroup } from "../form-group";
import { TextArea } from "./text-area";

export default {
  title: "Textarea",
  component: TextArea,
};

export const Base = () => {
  return <TextArea rows={5} />;
};

export const TextareaWithCharacterCount = () => {
  return (
    <FormGroup id="count" label="Comment">
      <TextArea maxLength={200} />
    </FormGroup>
  );
};
