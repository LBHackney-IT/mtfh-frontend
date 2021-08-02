import React from "react";

import { FormGroup } from "../form-group";
import { Input } from "../input";
import { Fieldset } from "./fieldset";

export default {
  title: "Fieldset",
  component: Fieldset,
};

export const Base = () => {
  return (
    <Fieldset heading="What is your address?">
      <FormGroup id="address-1" label="Address 1">
        <Input />
      </FormGroup>
      <FormGroup id="address-2" label="Address 2">
        <Input />
      </FormGroup>
    </Fieldset>
  );
};

export const FieldsetWithHeading = () => {
  return (
    <Fieldset variant="large" heading={<h1>What is your address?</h1>}>
      <FormGroup id="address-1" label="Address 1">
        <Input />
      </FormGroup>
      <FormGroup id="address-2" label="Address 2">
        <Input />
      </FormGroup>
    </Fieldset>
  );
};
