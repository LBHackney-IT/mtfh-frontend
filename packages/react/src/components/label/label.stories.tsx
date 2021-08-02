import React from "react";

import { Label } from "./label";

export default {
  title: "Label",
  component: Label,
};

export const Base = () => {
  return <Label>A descriptive label</Label>;
};

export const PolymorphicHint = () => {
  return <Label as="p">A descriptive label</Label>;
};
