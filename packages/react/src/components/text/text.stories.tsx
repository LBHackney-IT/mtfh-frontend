import React from "react";

import { Text } from "./text";

export default {
  title: "Text",
  component: Text,
};

export const Base = () => {
  return (
    <>
      <Text variant="lg">Lorem ipsum dolor sit amet</Text>
      <Text>Lorem ipsum dolor sit amet</Text>
      <Text variant="sm">Lorem ipsum dolor sit amet</Text>
      <Text variant="xs">Lorem ipsum dolor sit amet</Text>
    </>
  );
};

export const PolymorphicText = () => {
  return (
    <>
      <Text>
        Inline component{" "}
        <Text as="span" variant="lg">
          as span
        </Text>
      </Text>
    </>
  );
};
