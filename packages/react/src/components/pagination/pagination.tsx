import React, { Children, ComponentPropsWithoutRef, forwardRef } from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import cn from "classnames";

import styles from "./styles.module.scss";

export interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
  variant?: "base" | "center";
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination({ className, variant = "base", ...props }, ref) {
    return (
      <nav
        ref={ref}
        className={cn(
          styles.lbhPagination,
          { [styles.lbhPaginationCenter]: variant === "center" },
          className
        )}
        {...props}
      />
    );
  }
);

export const PaginationControls = forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<"ul">
>(function PaginationControls({ className, children, ...props }, ref) {
  return (
    <ul
      ref={ref}
      className={cn(styles.lbhPaginationList, className)}
      {...props}
    >
      {Children.map(
        children,
        (child) =>
          child && <li className={styles.lbhPaginationItem}>{child}</li>
      )}
    </ul>
  );
});

export const PaginationSummary = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function PaginationSummary({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(styles.lbhPaginationSummary, className)}
      {...props}
    />
  );
});

export interface PaginationButtonProps {
  variant?: "base" | "previous" | "next";
  active?: boolean;
}

export type PaginationButtonComponent = Polymorphic.ForwardRefComponent<
  "a",
  PaginationButtonProps
>;

export const PaginationButton: PaginationButtonComponent = forwardRef(
  function PaginationButton(
    {
      as: PaginationComp = "a",
      variant = "base",
      active = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <PaginationComp
        ref={ref}
        className={cn(
          styles.lbhPaginationLink,
          {
            [styles.lbhPaginationLinkNext]: variant === "next",
            [styles.lbhPaginationLinkCurrent]: variant === "base" && active,
          },
          className
        )}
        {...props}
      >
        {variant === "previous" ? (
          <span aria-hidden="true" role="presentation">
            &laquo;{" "}
          </span>
        ) : null}
        {children}
        {variant === "next" ? (
          <span aria-hidden="true" role="presentation">
            {" "}
            &raquo;
          </span>
        ) : null}
      </PaginationComp>
    );
  }
);
