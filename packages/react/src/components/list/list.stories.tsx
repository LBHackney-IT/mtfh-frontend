import React from "react";

import { List } from "./list";

export default {
  title: "List",
  component: List,
};

export const Base = () => {
  return (
    <List>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  );
};

export const ListWithBullets = () => {
  return (
    <List variant="bullet">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  );
};

export const ListWithNumerals = () => {
  return (
    <List as="ol" variant="number">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  );
};
