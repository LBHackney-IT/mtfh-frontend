import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";
import cn from "classnames";

import { widthOverrides } from "../../utils";
import styles from "./styles.module.scss";

export interface SummaryListItemProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  children?: ReactElement | string | string[] | null;
  actions?: ReactElement | ReactElement[];
  overrides?: number[];
  fallback?: string;
}

export const SummaryListItem = forwardRef<HTMLDivElement, SummaryListItemProps>(
  function SummaryListItem(
    { title, actions, children, className, fallback, overrides = [], ...props },
    ref
  ) {
    const value = useMemo(
      () => (typeof children === "string" ? children.trim() : children),
      [children]
    );

    return (
      <div
        ref={ref}
        className={cn(styles.govukSummaryListRow, className)}
        {...props}
      >
        <dt
          className={cn(
            styles.govukSummaryListKey,
            widthOverrides(overrides[0])
          )}
        >
          {title}
        </dt>
        <dd
          className={cn(
            styles.govukSummaryListValue,
            widthOverrides(overrides[1])
          )}
        >
          {value || fallback || "N/A"}
        </dd>
        {actions && (
          <dd
            className={cn(
              styles.govukSummaryListActions,
              widthOverrides(overrides[2])
            )}
          >
            <ul className={styles.govukSummaryListActionsList}>
              {Children.map(actions, (action) => (
                <li
                  key={action.key}
                  className={styles.govukSummaryListActionsListItem}
                >
                  {action}
                </li>
              ))}
            </ul>
          </dd>
        )}
      </div>
    );
  }
);

type SummaryListChild =
  | ReactElement<SummaryListItemProps>
  | ReactElement<SummaryListItemProps>[]
  | null;

export interface SummaryListProps extends ComponentPropsWithoutRef<"dl"> {
  variant?: "base" | "border";
  overrides?: number[];
  children: SummaryListChild | SummaryListChild[];
}

export const SummaryList = forwardRef<HTMLDListElement, SummaryListProps>(
  function SummaryList(
    { variant = "base", className, overrides, children, ...props },
    ref
  ) {
    return (
      <dl
        ref={ref}
        className={cn(
          styles.govukSummaryList,
          { [styles.govukSummaryListNoBorder]: variant !== "border" },
          styles.lbhSummaryList,
          className
        )}
        {...props}
      >
        {Children.map(
          children,
          (child, index) =>
            child &&
            isValidElement<SummaryListItemProps>(child) &&
            cloneElement(child, {
              overrides:
                !child.props.overrides && index === 0
                  ? overrides
                  : child.props.overrides,
            })
        )}
      </dl>
    );
  }
);
