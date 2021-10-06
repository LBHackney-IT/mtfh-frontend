import React, { forwardRef } from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

export type HintComponent = Polymorphic.ForwardRefComponent<"span">;

export const Hint: HintComponent = forwardRef(function Hint(
  { as: HintComp = "span", className, ...props },
  ref,
) {
  return (
    <HintComp
      ref={ref}
      className={cn(styles.govukHint, styles.lbhHint, className)}
      {...props}
    />
  );
});
