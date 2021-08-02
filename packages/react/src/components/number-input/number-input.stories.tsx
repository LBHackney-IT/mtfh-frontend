import React from "react";

import { NumberInput } from "./number-input";

export default {
  title: "Number Input",
  component: NumberInput,
};

export const Base = () => {
  return <NumberInput placeholder="Enter number" />;
};

export const NumberInputWithTypeNumber = () => {
  return <NumberInput type="number" placeholder="Enter number" />;
};

export const NumberWithMinMax = () => {
  return (
    <NumberInput placeholder="Enter Month" min={0} max={12} padStart={2} />
  );
};
