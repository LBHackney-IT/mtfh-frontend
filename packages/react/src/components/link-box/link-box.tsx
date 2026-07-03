import React, { ReactElement, forwardRef } from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import { LinkProps } from "../link";
import styles from "./styles.module.scss";

import type { ForwardRefComponent } from "../../types/polymorphic";

export interface LinkOverlayProps {
  children: ReactElement<LinkProps>;
  override?: number;
}

export type LinkOverlayComponent = ForwardRefComponent<"div", LinkOverlayProps>;

export const LinkOverlay = forwardRef(function LinkOverlay(
  { as: LinkOverlayComp = "div", className, override, ...props },
  ref,
) {
  return (
    <LinkOverlayComp
      ref={ref}
      className={cn(styles.linkOverlay, widthOverrides(override), className)}
      {...props}
    />
  );
}) as LinkOverlayComponent;

export interface LinkBoxProps {
  override?: number;
}

export type LinkBoxComponent = ForwardRefComponent<"div", LinkBoxProps>;

export const LinkBox = forwardRef(function LinkBox(
  { as: LinkBoxComp = "div", className, override, ...props },
  ref,
) {
  return (
    <LinkBoxComp
      ref={ref}
      className={cn(styles.linkBox, widthOverrides(override), className)}
      {...props}
    />
  );
}) as LinkBoxComponent;
