import { setMediaQuery } from "@hackney/mtfh-test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { BreakpointKey, useBreakpoint, useBreakpointValue } from "../use-breakpoint";

describe("useBreakpoint", () => {
  test("it returns undefined with no matching breakpoint", () => {
    setMediaQuery("(min-width: 0px)");
    const { result } = renderHook(() => useBreakpoint("test" as BreakpointKey));
    expect(result.current).toBe(undefined);
  });

  test("it returns a true on the matching breakpoint", () => {
    setMediaQuery("base");
    const { result } = renderHook(() => useBreakpoint("base"));
    expect(result.current).toBe(true);
  });
});

describe("useBreakpointValue", () => {
  test("it returns matching value on breakpoint", () => {
    setMediaQuery("base");
    const { result } = renderHook(() =>
      useBreakpointValue({ base: "hello", lg: "world" }),
    );
    expect(result.current).toBe("hello");
  });

  test("it returns best matching value on breakpoint", () => {
    setMediaQuery("md");
    const { result } = renderHook(() =>
      useBreakpointValue({ base: "hello", lg: "world" }),
    );
    expect(result.current).toBe("hello");
  });

  test("it returns undefined if there is no matching breakpoint", () => {
    setMediaQuery("lg");
    const { result } = renderHook(() =>
      useBreakpointValue({ test: "hello" } as Partial<Record<BreakpointKey, string>>),
    );
    expect(result.current).toBe(undefined);
  });
});
