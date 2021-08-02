import React from "react";

import { ErrorMessage } from "./error-message";

export default {
  title: "Error Message",
  component: ErrorMessage,
};

export const Base = () => {
  return <ErrorMessage>Error message about full name goes here</ErrorMessage>;
};
