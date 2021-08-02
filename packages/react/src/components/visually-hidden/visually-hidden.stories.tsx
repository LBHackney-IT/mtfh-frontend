import React from "react";

import { Text } from "../text";
import { VisuallyHidden } from "./visually-hidden";

export default {
  title: "Visually Hidden",
  component: VisuallyHidden,
};

export const Base = () => {
  return (
    <Text>
      <VisuallyHidden>Error: </VisuallyHidden>Something has gone wrong
    </Text>
  );
};
