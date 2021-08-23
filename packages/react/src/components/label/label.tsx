import React, { forwardRef } from "react"
import type * as Polymorphic from "@radix-ui/react-polymorphic"
import cn from "classnames"

import styles from "./styles.module.scss"

export interface LabelProps {
  variant?: "base" | "sm" | "md" | "lg" | "xl"
}

export type LabelComponent = Polymorphic.ForwardRefComponent<
  "label",
  LabelProps
>

export const Label: LabelComponent = forwardRef(function Label(
  { as: LabelComp = "label", variant = "base", className, ...props },
  ref,
) {
  return (
    <LabelComp
      ref={ref}
      className={cn(
        styles.govukLabel,
        {
          [styles.govukLabelS]: variant === "sm",
          [styles.govukLabelM]: variant === "md",
          [styles.govukLabelL]: variant === "lg",
          [styles.govukLabelXL]: variant === "xl",
        },
        styles.lbhLabel,
        className,
      )}
      {...props}
    />
  )
})
