import React from "react";

import { ErrorSummary } from "./error-summary";

export default {
  title: "Error Summary",
  component: ErrorSummary,
};

export const Base = () => {
  return (
    <ErrorSummary id="error-summary" title="There is a problem">
      <a href="#error-1">The date your passport was issued must be in the past</a>
      <a href="#errror-2">Enter a postcode, like AA1 1AA</a>
    </ErrorSummary>
  );
};
