import React from "react";

import { Select } from "./select";

export default {
  title: "Select",
  component: Select,
};

export const Base = () => {
  return (
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  );
};

export const SelectWithError = () => {
  return (
    <Select error>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  );
};

export const SelectWithOverride = () => {
  return (
    <Select override={1 / 2}>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  );
};
