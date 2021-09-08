import React, { forwardRef } from "react"
import type * as Polymorphic from "@radix-ui/react-polymorphic"
import cn from "classnames"

import { widthOverrides } from "../../utils"
import styles from "./styles.module.scss"

export interface ButtonProps {
  variant?: "primary" | "secondary"
  isLoading?: boolean
  isDisabled?: boolean
  loadingText?: string
  override?: number
}

export type ButtonComponent = Polymorphic.ForwardRefComponent<
  "button",
  ButtonProps
>

export const Button: ButtonComponent = forwardRef(function Button(
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
  )

  const disabled = isDisabled || isLoading || undefined

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
  )
})
