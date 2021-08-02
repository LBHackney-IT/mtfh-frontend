import React from "react";

import { Hint } from "./hint";

export default {
  title: "Hint",
  component: Hint,
};

export const Base = () => {
  return <Hint>A descriptive hint</Hint>;
};

export const PolymorphicHint = () => {
  return <Hint as="p">A descriptive hint</Hint>;
};
