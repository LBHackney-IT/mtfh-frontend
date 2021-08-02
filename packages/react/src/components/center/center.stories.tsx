import React from "react";

import { Center } from "./center";

export default {
  title: "Center",
  component: Center,
};

const Dot = () => (
  <div
    style={{
      width: "50px",
      height: "50px",
      background: "green",
      borderRadius: "50%",
    }}
  />
);

export const Base = () => {
  return (
    <Center>
      <Dot />
    </Center>
  );
};

export const Vertical = () => {
  return (
    <Center horizontally={false} style={{ height: "200px" }}>
      <Dot />
    </Center>
  );
};

export const Horizontal = () => {
  return (
    <Center vertically={false} style={{ height: "200px" }}>
      <Dot />
    </Center>
  );
};
