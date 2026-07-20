import React, {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import cn from "classnames";

import { useBreakpoint } from "../../hooks";
import { Accordion, AccordionItem, AccordionItemProps } from "../accordion";

import type { ForwardRefComponent } from "../../types/polymorphic";
import "./styles.module.scss";

export interface SideBarSectionProps
  extends
    Omit<React.ComponentPropsWithoutRef<"div">, "id" | "title">,
    AccordionItemProps {
  isCollapsed?: boolean;
  heading?: string;
}

export type SideBarSectionComponent = ForwardRefComponent<"div", SideBarSectionProps>;

export const SideBarSection = forwardRef<HTMLDivElement, SideBarSectionProps>(
  function SideBarSection(
    { children, heading, className, isCollapsed = false, ...props },
    ref,
  ) {
    if (isCollapsed) {
      return (
        <AccordionItem ref={ref} {...props}>
          {children}
        </AccordionItem>
      );
    }

    return (
      <div ref={ref} className={cn("mtfh-sidebar-section", className)} {...props}>
        {heading ? <h2 className="lbh-heading-h2">{heading}</h2> : undefined}
        {children}
      </div>
    );
  },
) as SideBarSectionComponent;

export interface SideBarProps {
  id: string;
  top?: ReactElement;
  children:
    | ReactElement<SideBarSectionProps>
    | null
    | Array<ReactElement<SideBarSectionProps> | null>;
}

export type SideBarComponent = ForwardRefComponent<"div", SideBarProps>;

export const SideBar = forwardRef(function SideBar(
  { as: SideBarComp = "div", id, top, children, className, ...props },
  ref,
) {
  const isDesktop = useBreakpoint("md");
  const sidebarClasses = cn("mtfh-sidebar", className);

  return (
    <SideBarComp ref={ref} className={sidebarClasses} {...props}>
      {top}
      {!isDesktop ? (
        <Accordion id={id}>
          {Children.map<
            ReactElement<SideBarSectionProps> | undefined,
            ReactElement<SideBarSectionProps> | null
          >(children, (child) =>
            child && isValidElement(child)
              ? cloneElement(child, {
                  isCollapsed: true,
                })
              : undefined,
          )}
        </Accordion>
      ) : (
        <div id={id}>{children}</div>
      )}
    </SideBarComp>
  );
}) as SideBarComponent;
