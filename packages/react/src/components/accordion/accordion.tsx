import React, { ReactElement, forwardRef, useEffect, useRef } from "react";
import mergeRefs from "react-merge-refs";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import { Heading } from "../heading";
import styles from "./styles.module.scss";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

export interface AccordionItemProps {
  id: string;
  title: string;
}

export type AccordionItemComponent = Polymorphic.ForwardRefComponent<
  "div",
  AccordionItemProps
>;

export const AccordionItem: AccordionItemComponent = forwardRef(function AccordionItem(
  { as: AccordionItemComp = "div", children, className, id, title },
  ref,
) {
  return (
    <AccordionItemComp ref={ref} className={cn(styles.govukAccordionSection, className)}>
      <div className={styles.govukAccordionSectionHeader}>
        <Heading as="h3" variant="h5" className={styles.govukAccordionSectionHeading}>
          <span
            className={styles.govukAccordionSectionButton}
            id={`accordion-heading-${id}`}
          >
            {title}
          </span>
        </Heading>
      </div>
      <div
        id={`accordion-content-${id}`}
        className={styles.govukAccordionSectionContent}
        aria-labelledby={`accordion-heading-${id}`}
      >
        {children}
      </div>
    </AccordionItemComp>
  );
});

type AccordionChild =
  | ReactElement<AccordionItemProps>
  | ReactElement<AccordionItemProps>[]
  | null;

export interface AccordionProps {
  id: string;
  children: AccordionChild | AccordionChild[];
  visuallyHideControls?: boolean;
  override?: number;
}

export type AccordionComponent = Polymorphic.ForwardRefComponent<"div", AccordionProps>;

export const Accordion: AccordionComponent = forwardRef(function Accordion(
  {
    as: AccordionComp = "div",
    className,
    override,
    visuallyHideControls = false,
    ...props
  },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async (element: HTMLElement) => {
      const { default: LBHAccordion } = await import(
        "lbh-frontend/lbh/components/lbh-accordion/accordion"
      );
      const acc = new LBHAccordion(element);
      acc.$sections = element.querySelectorAll(`.${styles.govukAccordionSection}`);
      acc.controlsClass = styles.govukAccordionControls;
      acc.openAllClass = styles.govukAccordionOpenAll;
      acc.iconClass = styles.govukAccordionIcon;
      acc.sectionHeaderClass = styles.govukAccordionSectionHeader;
      acc.sectionHeaderFocusedClass = styles.govukAccordionSectionHeaderFocused;
      acc.sectionHeadingClass = styles.govukAccordionSectionHeading;
      acc.sectionSummaryClass = styles.govukAccordionSectionSummary;
      acc.sectionButtonClass = styles.govukAccordionSectionButton;
      acc.sectionExpandedClass = styles.govukAccordionSectionExpanded;
      acc.init();
    };
    /* istanbul ignore else */
    if (localRef.current && window !== undefined && document !== undefined) {
      init(localRef.current);
    }
  }, []);

  return (
    <AccordionComp
      className={cn(
        styles.govukAccordion,
        styles.lbhAccordion,
        { [styles.visuallyHidden]: visuallyHideControls },
        widthOverrides(override),
        className,
      )}
      data-attribute="value"
      ref={mergeRefs([localRef, ref])}
      {...props}
    />
  );
});
