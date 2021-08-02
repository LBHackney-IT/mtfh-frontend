import React from "react";

import { Heading } from "./heading";

export default {
  title: "Heading",
  component: Heading,
};

export const Base = () => {
  return (
    <>
      <Heading>H1 Heading</Heading>
      <Heading variant="h2">H2 Heading</Heading>
      <Heading variant="h3">H3 Heading</Heading>
      <Heading variant="h4">H4 Heading</Heading>
      <Heading variant="h5">H5 Heading</Heading>
      <Heading variant="h6">H6 Heading</Heading>
    </>
  );
};

export const PolymorphicHeading = () => {
  return (
    <>
      <Heading as="h1" variant="h2">
        H1 as H2
      </Heading>
      <Heading as="span">Span as H1</Heading>
    </>
  );
};
