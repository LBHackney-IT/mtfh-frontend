import React, { forwardRef } from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

import type { ForwardRefComponent } from "../../types/polymorphic";

export type VisuallyHiddenComponent = ForwardRefComponent<"span">;

export const VisuallyHidden = forwardRef(function VisuallyHidden(
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
}) as VisuallyHiddenComponent;
