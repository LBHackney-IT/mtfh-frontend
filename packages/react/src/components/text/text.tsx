import React, { forwardRef } from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import cn from "classnames";

import styles from "./styles.module.scss";

export interface TextProps {
  variant?: "xs" | "sm" | "md" | "lg";
}

export type TextComponent = Polymorphic.ForwardRefComponent<"p", TextProps>;

export const Text: TextComponent = forwardRef(function Heading(
  { as: TextComp = "p", variant = "md", className, ...props },
  ref
) {
  return (
    <TextComp
      ref={ref}
      className={cn(
        {
          [styles.lbhBodyXs]: variant === "xs",
          [styles.lbhBodyS]: variant === "sm",
          [styles.lbhBodyM]: variant === "md",
          [styles.lbhBodyL]: variant === "lg",
        },
        className
      )}
      {...props}
    />
  );
});
