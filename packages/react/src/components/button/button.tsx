import React, { forwardRef } from "react";

import cn from "classnames";

import styles from "./styles.module.scss";
import { widthOverrides } from "../../utils";

import type { ForwardRefComponent } from "../../types/polymorphic";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  override?: number;
}

export type ButtonComponent = ForwardRefComponent<"button", ButtonProps>;

export const Button = forwardRef(function Button(
  {
    as: ButtonComp = "button",
    variant = "primary",
    isLoading = false,
    loadingText,
    isDisabled,
    children,
    className,
    override,
    ...props
  },
  ref,
) {
  const buttonClasses = cn(
    styles.govukButton,
    styles.lbhButton,
    {
      [`${styles.govukButtonSecondary} ${styles.lbhButtonSecondary}`]:
        variant === "secondary",
      [`${styles.govukButtonDisabled} ${styles.lbhButtonDisabled}`]: isDisabled,
    },
    widthOverrides(override),
    className,
  );

  const disabled = isDisabled || isLoading || undefined;

  return (
    <ButtonComp
      ref={ref}
      className={buttonClasses}
      type={ButtonComp === "button" ? "button" : undefined}
      disabled={ButtonComp === "button" ? disabled : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {isLoading && (
        <span className={styles.buttonLoadingIndicator}>
          <span>Loading...</span>
        </span>
      )}
      {isLoading && loadingText ? loadingText : children}
    </ButtonComp>
  );
}) as ButtonComponent;
