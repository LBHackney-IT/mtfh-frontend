import React, { forwardRef } from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import cn from "classnames";

import styles from "./styles.module.scss";

export type LabelComponent = Polymorphic.ForwardRefComponent<"label">;

export const Label: LabelComponent = forwardRef(function Label(
  { as: LabelComp = "label", className, ...props },
  ref
) {
  return (
    <LabelComp
      ref={ref}
      className={cn(styles.govukLabel, styles.lbhLabel, className)}
      {...props}
    />
  );
});
