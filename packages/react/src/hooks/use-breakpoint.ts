import { BREAKPOINTS, breakpoints } from "@hackney/mtfh-system";
import useMediaBreakpoint from "use-breakpoint";

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const useBreakpoint = (
  breakpoint: BreakpointKey,
  defaultBreakpoint?: BreakpointKey,
): boolean | undefined => {
  const { minWidth } = useMediaBreakpoint(BREAKPOINTS, defaultBreakpoint);
  const point = breakpoints.get(breakpoint);
  if (point !== undefined) {
    return minWidth >= point;
  }
  return undefined;
};

export const useBreakpointValue = <T extends any>(
  breakpointRecord: Partial<Record<BreakpointKey, T>>,
  defaultBreakpoint?: BreakpointKey,
): T | undefined => {
  const { minWidth, breakpoint } = useMediaBreakpoint(BREAKPOINTS, defaultBreakpoint);
  const valueKeys = Object.keys(breakpointRecord) as BreakpointKey[];
  const index = valueKeys.indexOf(breakpoint);
  if (index !== -1) {
    return breakpointRecord[`${breakpoint}` as BreakpointKey];
  }

  let maxPointMatch = 0;
  let keyMatch: BreakpointKey | null = null;

  for (let i = 0; i < valueKeys.length; i += 1) {
    const key = valueKeys[Number(i)];
    const point = breakpoints.get(key);
    if (point !== undefined && minWidth >= point && maxPointMatch <= point) {
      maxPointMatch = point;
      keyMatch = key;
    }
  }

  if (keyMatch) {
    return breakpointRecord[`${keyMatch}` as BreakpointKey];
  }

  return undefined;
};
