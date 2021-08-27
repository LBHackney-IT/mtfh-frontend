import React, { forwardRef } from "react"
import type * as Polymorphic from "@radix-ui/react-polymorphic"
import cn from "classnames"

import { widthOverrides } from "../../utils"

import { Heading } from "../heading"

import styles from "./styles.module.scss"

export interface PanelProps {
  titleText?: string
  bodyText?: string
  override?: number
  headingElementType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export type PanelComponent = Polymorphic.ForwardRefComponent<"div", PanelProps>

export const Panel: PanelComponent = forwardRef(
  (
    {
      as: PanelComp = "div",
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
      widthOverrides(override),
      className,
    )

    return (
      <PanelComp ref={ref} className={panelClasses} {...props}>
        {titleText && (
          <Heading as={headingElementType} className={styles.govukPanelTitle}>
            {titleText}
          </Heading>
        )}
        {bodyText && <div className={styles.govukPanelBody}>{bodyText}</div>}
      </PanelComp>
    )
  },
)
