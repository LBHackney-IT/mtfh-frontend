import React, { forwardRef } from "react";

import cn from "classnames";

import { VisuallyHidden } from "../visually-hidden";
import styles from "./styles.module.scss";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

export interface ErrorMessageProps {
  assistiveText?: string;
}

export type ErrorMessageComponent = Polymorphic.ForwardRefComponent<
  "span",
  ErrorMessageProps
>;

export const ErrorMessage: ErrorMessageComponent = forwardRef(function ErrorMessage(
  {
    as: ErrorMessageComp = "span",
    assistiveText = "Error",
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <ErrorMessageComp
      ref={ref}
      className={cn(styles.govukErrorMessage, styles.lbhErrorMessage, className)}
      {...props}
    >
      {assistiveText && <VisuallyHidden>{assistiveText}:</VisuallyHidden>}
      {children}
    </ErrorMessageComp>
  );
});
