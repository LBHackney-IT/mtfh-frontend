import React, { forwardRef } from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import styles from "./styles.module.scss";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

export interface CenterProps {
  horizontally?: boolean;
  vertically?: boolean;
  override?: number;
}

export type CenterComponent = Polymorphic.ForwardRefComponent<"div", CenterProps>;

export const Center: CenterComponent = forwardRef(function Center(
  {
    as: CenterComp = "div",
    horizontally = true,
    vertically = true,
    className,
    override,
    ...props
  },
  ref,
) {
  return (
    <CenterComp
      ref={ref}
      className={cn(
        styles.center,
        {
          [styles.centerHorizontal]: horizontally,
          [styles.centerVertical]: vertically,
        },
        widthOverrides(override),
        className,
      )}
      {...props}
    />
  );
});
