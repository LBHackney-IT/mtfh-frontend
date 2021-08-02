import React from "react";

import { Input } from "../input";
import { FormGroup } from "./form-group";

export default {
  title: "Form Group",
  component: FormGroup,
};

export const Base = () => {
  return (
    <FormGroup id="name" label="First Name">
      <Input />
    </FormGroup>
  );
};

export const FormGroupWithHint = () => {
  return (
    <FormGroup
      id="name"
      label="First Name"
      hint="You can find this name on your passport"
    >
      <Input />
    </FormGroup>
  );
};

export const FormGroupWithRequired = () => {
  return (
    <FormGroup id="name" label="First Name" required>
      <Input />
    </FormGroup>
  );
};

export const FormGroupWithError = () => {
  return (
    <FormGroup
      id="name"
      label="First Name"
      error="First Name is required"
      required
    >
      <Input />
    </FormGroup>
  );
};
