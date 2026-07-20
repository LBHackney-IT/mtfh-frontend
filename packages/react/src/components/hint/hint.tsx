import React, { forwardRef } from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

import type { ForwardRefComponent } from "../../types/polymorphic";

export type HintComponent = ForwardRefComponent<"span">;

export const Hint = forwardRef(function Hint(
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
}) as HintComponent;
