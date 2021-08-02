import React from "react";

import {
  Pagination,
  PaginationButton,
  PaginationControls,
  PaginationSummary,
} from "./pagination";

export default {
  title: "Pagination",
  component: Pagination,
};

export const Base = () => {
  return (
    <Pagination>
      <PaginationSummary>Showing 101—150 of 246 results</PaginationSummary>
      <PaginationControls>
        <PaginationButton variant="previous" href="/2">
          Previous
        </PaginationButton>
        <PaginationButton href="/1">1</PaginationButton>
        <PaginationButton as="button">2</PaginationButton>
        <PaginationButton href="/3" active>
          3
        </PaginationButton>
        <PaginationButton href="/4">4</PaginationButton>
        <PaginationButton href="/5">5</PaginationButton>
        <PaginationButton variant="next" href="/4">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>
  );
};

export const PaginationWithButtons = () => {
  return (
    <Pagination>
      <PaginationSummary>Showing 101—150 of 246 results</PaginationSummary>
      <PaginationControls>
        <PaginationButton as="button" variant="previous">
          Previous
        </PaginationButton>
        <PaginationButton as="button">1</PaginationButton>
        <PaginationButton as="button">2</PaginationButton>
        <PaginationButton as="button" active>
          3
        </PaginationButton>
        <PaginationButton as="button">4</PaginationButton>
        <PaginationButton as="button">5</PaginationButton>
        <PaginationButton as="button" variant="next">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>
  );
};

export const PaginationWithoutSummary = () => {
  return (
    <Pagination>
      <PaginationControls>
        <PaginationButton variant="previous" href="/2">
          Previous
        </PaginationButton>
        <PaginationButton href="/1">1</PaginationButton>
        <PaginationButton as="button">2</PaginationButton>
        <PaginationButton href="/3" active>
          3
        </PaginationButton>
        <PaginationButton href="/4">4</PaginationButton>
        <PaginationButton href="/5">5</PaginationButton>
        <PaginationButton variant="next" href="/4">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>
  );
};

export const PaginationCenterAligned = () => {
  return (
    <Pagination variant="center">
      <PaginationControls>
        <PaginationButton variant="previous" href="/2">
          Previous
        </PaginationButton>
        <PaginationButton href="/1">1</PaginationButton>
        <PaginationButton as="button">2</PaginationButton>
        <PaginationButton href="/3" active>
          3
        </PaginationButton>
        <PaginationButton href="/4">4</PaginationButton>
        <PaginationButton href="/5">5</PaginationButton>
        <PaginationButton variant="next" href="/4">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>
  );
};
