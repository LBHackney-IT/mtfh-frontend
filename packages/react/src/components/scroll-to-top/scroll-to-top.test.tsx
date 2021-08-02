import React from "react";
import { waitFor } from "@testing-library/react";
import { render } from "@lbh-mtfh/test-utils";

import { ScrollToTop } from "./scroll-to-top";

const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: mockScrollTo,
  writable: true,
});

beforeEach(() => {
  mockScrollTo.mockReset();
});

test("it scrolls to top on route change", async () => {
  const [_, history] = render(<ScrollToTop />);
  history.push("/test");
  await waitFor(() => expect(mockScrollTo).toBeCalledTimes(1));
  expect(mockScrollTo).toBeCalledWith(0, 0);
});

test("it will not trigger on back or forward", async () => {
  const [_, history] = render(<ScrollToTop />);
  history.push("/test");
  await waitFor(() => expect(mockScrollTo).toBeCalledTimes(1));
  expect(mockScrollTo).toBeCalledWith(0, 0);
  history.goBack();
  await waitFor(() => expect(mockScrollTo).toBeCalledTimes(1));
  history.goForward();
  await waitFor(() => expect(mockScrollTo).toBeCalledTimes(1));
});
