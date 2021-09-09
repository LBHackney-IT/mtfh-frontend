import React, { forwardRef } from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import cn from "classnames";

import styles from "./styles.module.scss";

export type VisuallyHiddenComponent = Polymorphic.ForwardRefComponent<"span">;

export const VisuallyHidden: VisuallyHiddenComponent = forwardRef(function VisuallyHidden(
  { as: VisuallyHiddenComp = "span", className, ...props },
  ref,
) {
  return (
    <VisuallyHiddenComp
      ref={ref}
      className={cn(styles.visuallyHidden, className)}
      {...props}
    />
  );
});
