import React, { forwardRef } from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import styles from "./styles.module.scss";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

export interface LinkProps {
  variant?:
    | "link"
    | "danger"
    | "text-colour"
    | "muted"
    | "back-link"
    | "no-underline"
    | "native";
  isExternal?: boolean;
  override?: number;
}

export type LinkComponent = Polymorphic.ForwardRefComponent<"a", LinkProps>;

export const Link: LinkComponent = forwardRef(function Link(
  {
    as: LinkComp = "a",
    variant = "link",
    isExternal = false,
    className,
    rel,
    target,
    override,
    ...props
  },
  ref,
) {
  const linkClasses = cn(
    variant !== "native" && {
      [`${styles.govukLink} ${styles.lbhLink}`]: variant !== "back-link",
      [`${styles.govukBackLink} ${styles.lbhBackLink}`]: variant === "back-link",
      [styles[`lbh-link--${variant}`]]: variant !== "link" && variant !== "back-link",
      [styles.lbhLinkNoVisitedState]:
        !isExternal && !["danger", "muted", "text-colour"].includes(variant),
    },
    widthOverrides(override),
    className,
  );

  return (
    <LinkComp
      ref={ref}
      className={linkClasses}
      rel={isExternal ? "noopener noreferrer" : rel}
      target={isExternal ? "_blank" : target}
      {...props}
    />
  );
});
