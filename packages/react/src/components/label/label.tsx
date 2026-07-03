import React, { forwardRef } from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

import type { ForwardRefComponent } from "../../types/polymorphic";

export interface LabelProps {
  variant?: "base" | "sm" | "md" | "lg" | "xl";
}

export type LabelComponent = ForwardRefComponent<"label", LabelProps>;

export const Label = forwardRef(function Label(
  { as: LabelComp = "label", variant = "base", className, ...props },
  ref,
) {
  return (
    <LabelComp
      ref={ref}
      className={cn(
        styles.govukLabel,
        {
          [styles.govukLabelS]: variant === "sm",
          [styles.govukLabelM]: variant === "md",
          [styles.govukLabelL]: variant === "lg",
          [styles.govukLabelXL]: variant === "xl",
        },
        styles.lbhLabel,
        className,
      )}
      {...props}
    />
  );
}) as LabelComponent;
