import React from "react";

import { SimplePagination, SimplePaginationButton } from "./simple-pagination";

export default {
  title: "Simple Pagination",
  component: SimplePaginationButton,
};

export const Base = () => {
  return (
    <SimplePagination>
      <SimplePaginationButton title="Blog Post 1" variant="previous">
        Previous
      </SimplePaginationButton>
      <SimplePaginationButton title="Blog Post 2" variant="next">
        Next
      </SimplePaginationButton>
    </SimplePagination>
  );
};

export const SimplePaginationWithSingleButton = () => {
  return (
    <SimplePagination>
      <SimplePaginationButton variant="next">Next</SimplePaginationButton>
    </SimplePagination>
  );
};

export const PolymorphicSimplePaginationButton = () => {
  return (
    <SimplePagination>
      <SimplePaginationButton
        as="button"
        title="Blog Post 1"
        variant="previous"
      >
        Previous
      </SimplePaginationButton>
      <SimplePaginationButton as="button" title="Blog Post 2" variant="next">
        Next
      </SimplePaginationButton>
    </SimplePagination>
  );
};
