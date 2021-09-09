import React from "react";

import { Checkbox, CheckboxConditional, CheckboxGroup } from "./checkboxes";

export default {
  title: "Checkbox",
  component: Checkbox,
};

export const Base = () => {
  return <Checkbox id="checkbox-1">Checkbox Label</Checkbox>;
};

export const CheckboxWithHint = () => {
  return (
    <Checkbox id="checkbox-2" hint="A descriptive hint">
      Checkbox Label
    </Checkbox>
  );
};

export const Checkboxes = () => {
  return (
    <CheckboxGroup>
      <Checkbox id="checkbox-group-1">Checkbox 1</Checkbox>
      <Checkbox id="checkbox-group-2">Checkbox 2</Checkbox>
    </CheckboxGroup>
  );
};

export const SmallCheckboxes = () => {
  return (
    <CheckboxGroup variant="small">
      <Checkbox id="checkbox-group-3">Checkbox 1</Checkbox>
      <Checkbox id="checkbox-group-4">Checkbox 2</Checkbox>
    </CheckboxGroup>
  );
};

export const Conditionals = () => {
  return (
    <CheckboxGroup>
      <Checkbox id="checkbox-group-5">Checkbox 1</Checkbox>
      <Checkbox id="checkbox-group-6" aria-controls="conditional">
        Checkbox 2 with Conditional
      </Checkbox>
      <CheckboxConditional id="conditional">This is a conditional</CheckboxConditional>
    </CheckboxGroup>
  );
};

export const CheckboxesWithHints = () => {
  return (
    <CheckboxGroup>
      <Checkbox id="checkbox-group-7" hint="Hint 1">
        Checkbox 1
      </Checkbox>
      <Checkbox id="checkbox-group-8" hint="Hint 2">
        Checkbox 2
      </Checkbox>
    </CheckboxGroup>
  );
};
