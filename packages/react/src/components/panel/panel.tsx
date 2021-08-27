import React, { forwardRef } from "react"
import type * as Polymorphic from "@radix-ui/react-polymorphic"
import cn from "classnames"

import { widthOverrides } from "../../utils"

import { Heading } from "../heading"
import { Icon } from "../icon"

import styles from "./styles.module.scss"

type Variant = "success" | "error"

export interface PanelProps {
  variant?: Variant
  titleText?: string
  bodyText?: string
  override?: number
  headingElementType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export type PanelComponent = Polymorphic.ForwardRefComponent<"div", PanelProps>

const StatusIcon: React.FunctionComponent<{ variant: Variant }> = ({
  variant,
}) => (
  <div className={styles.iconStatusContainer}>
    <Icon width="45" height="45" viewBox="0 0 45 45" fill="none">
      <circle cx="22.5" cy="22.5" r="22.5" fill="white" />
      {variant === "success" && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          transform="translate(10,12)"
          d="M24.625 3.57495L8.14649 20.75L0.25 12.5197L3.56004 9.06978L8.14649 13.8501L21.315 0.125L24.625 3.57495Z"
          fill="#00664F"
        />
      )}
      {variant === "error" && (
        <path
          transform="translate(19,11)"
          d="M5.29688 15.6587H1.60352L0.831543 0.870117H6.06885L5.29688 15.6587ZM0.770996 20.8354C0.770996 19.9878 0.998047 19.347 1.45215 18.9131C1.90625 18.4792 2.56722 18.2622 3.43506 18.2622C4.27262 18.2622 4.91846 18.4842 5.37256 18.9282C5.83675 19.3722 6.06885 20.008 6.06885 20.8354C6.06885 21.6326 5.83675 22.2633 5.37256 22.7275C4.90837 23.1816 4.26253 23.4087 3.43506 23.4087C2.5874 23.4087 1.93148 23.1867 1.46729 22.7427C1.00309 22.2886 0.770996 21.6528 0.770996 20.8354Z"
          fill="#BE3A34"
        />
      )}
    </Icon>
  </div>
)

export const Panel: PanelComponent = forwardRef(
  (
    {
      as: PanelComp = "div",
      variant,
      titleText,
      bodyText,
      headingElementType = "h1",
      className,
      override,
      ...props
    },
    ref,
  ) => {
    const panelClasses = cn(
      styles.govukPanel,
      styles.govukPanelConfirmation,
      styles.lbhPanel,
      {
        [styles.panelContainerSuccess]: variant === "success",
        [styles.panelContainerError]: variant === "error",
      },
      widthOverrides(override),
      className,
    )

    return (
      <PanelComp ref={ref} className={panelClasses} {...props}>
        {variant && <StatusIcon variant={variant} />}
        <div className={styles.panelTextContainer}>
          {titleText && (
            <Heading as={headingElementType} className={styles.govukPanelTitle}>
              {titleText}
            </Heading>
          )}
          {bodyText && <div className={styles.govukPanelBody}>{bodyText}</div>}
        </div>
      </PanelComp>
    )
  },
)
