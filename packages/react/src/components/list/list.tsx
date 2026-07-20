import React, { forwardRef } from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

import type { ForwardRefComponent } from "../../types/polymorphic";

export interface ListProps {
  variant?: "bullet" | "number" | "base";
}

export type ListComponent = ForwardRefComponent<"ul", ListProps>;

export const List = forwardRef(function List(
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
}) as ListComponent;
