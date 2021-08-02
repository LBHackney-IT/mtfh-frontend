import React from "react";

import { Button } from "./button";

export default {
  title: "Button",
  component: Button,
};

export const Base = () => {
  return <Button>Button</Button>;
};

export const Secondary = () => {
  return <Button variant="secondary">Secondary Button</Button>;
};

export const ButtonLink = () => {
  return (
    <Button as="a" href="/">
      Button Link
    </Button>
  );
};

export const LoadingIndicator = () => {
  return <Button isLoading>Button</Button>;
};

export const LoadingIndicatorWithText = () => {
  return (
    <Button loadingText="I'm Loading" isLoading>
      Button
    </Button>
  );
};
