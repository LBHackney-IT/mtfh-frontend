import React, { forwardRef } from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import cn from "classnames";

import styles from "./styles.module.scss";

export interface ListProps {
  variant?: "bullet" | "number" | "base";
}

export type ListComponent = Polymorphic.ForwardRefComponent<"ul", ListProps>;

export const List: ListComponent = forwardRef(function List(
  { as: ListComp = "ul", variant = "base", className, ...props },
  ref,
) {
  return (
    <ListComp
      ref={ref}
      className={cn(
        styles.lbhList,
        {
          [styles.lbhListBullet]: variant === "bullet",
          [styles.lbhListNumber]: variant === "number",
        },
        className,
      )}
      {...props}
    />
  );
});
