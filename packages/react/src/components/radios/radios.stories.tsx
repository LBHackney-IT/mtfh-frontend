import React from "react";

import { FormGroup } from "../form-group";
import { Input } from "../input";
import { Radio, RadioConditional, RadioDivider, RadioGroup } from "./radios";

export default {
  title: "Radios",
  component: Radio,
};

export const Base = () => {
  return (
    <RadioGroup name="radio">
      <Radio id="radio-1">Option 1</Radio>
      <Radio id="radio-2">Option 2</Radio>
    </RadioGroup>
  );
};

export const RadiosWithDivider = () => {
  return (
    <RadioGroup name="radio">
      <Radio id="radio-1">Option 1</Radio>
      <RadioDivider>or</RadioDivider>
      <Radio id="radio-2">Option 2</Radio>
    </RadioGroup>
  );
};

export const RadiosWithConditional = () => {
  return (
    <RadioGroup name="contact">
      <Radio id="radio-1" aria-controls="email">
        Email
      </Radio>
      <RadioConditional id="email">
        <FormGroup id="input" label="Email" name="email">
          <Input />
        </FormGroup>
      </RadioConditional>
      <Radio id="radio-2" aria-controls="phone">
        Phone
      </Radio>
      <RadioConditional id="phone">
        <FormGroup id="input" label="Phone" name="phone">
          <Input />
        </FormGroup>
      </RadioConditional>
    </RadioGroup>
  );
};
