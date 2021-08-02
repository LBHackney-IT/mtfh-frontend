import React from "react";

import { Input } from "./input";

export default {
  title: "Input",
  component: Input,
};

export const Base = () => {
  return <Input placeholder="Enter postcode" />;
};

export const InputWithError = () => {
  return <Input error />;
};
