import React, {
  ComponentProps,
  ReactElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import mergeRefs from "react-merge-refs";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import { List } from "../list";
import styles from "./styles.module.scss";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

export interface ErrorSummaryProps {
  id: string;
  title: string;
  description?: string;
  reFocus?: number;
  children?:
    | ReactElement<ComponentProps<"a">>
    | null
    | Array<ReactElement<ComponentProps<"a">> | null>;
  override?: number;
}

export type ErrorSummaryComponent = Polymorphic.ForwardRefComponent<
  "div",
  ErrorSummaryProps
>;

export const ErrorSummary: ErrorSummaryComponent = forwardRef(function ErrorSummary(
  {
    as: ErrorSummaryComp = "div",
    id,
    title,
    description,
    className,
    children,
    reFocus,
    override,
    ...props
  },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async (ref: HTMLElement) => {
      const { default: LBHErrorSummary } = await import(
        "lbh-frontend/lbh/components/lbh-error-summary/error-summary"
      );
      const summary = new LBHErrorSummary(ref);
      summary.init();
      ref.scrollIntoView(true);
    };
    /* istanbul ignore else */
    if (localRef.current && window !== undefined && document !== undefined) {
      init(localRef.current);
    }
  }, []);

  useEffect(() => {
    /* istanbul ignore else */
    if (localRef.current) {
      localRef.current.scrollIntoView(true);
    }
  }, [reFocus]);

  return (
    <ErrorSummaryComp
      ref={mergeRefs([localRef, ref])}
      className={cn(
        styles.govukErrorSummary,
        styles.lbhErrorSummary,
        widthOverrides(override),
        className,
      )}
      aria-labelledby={id}
      role="alert"
      {...props}
    >
      <h2 className={styles.govukErrorSummaryTitle} id={id}>
        {title}
      </h2>
      {description || children ? (
        <div className={styles.govukErrorSummaryBody}>
          {description ? <p>{description}</p> : null}
          {children ? (
            <List className={styles.govukErrorSummaryList}>
              {React.Children.map(
                children,
                (child) => child && isValidElement(child) && <li>{child}</li>,
              )}
            </List>
          ) : null}
        </div>
      ) : null}
    </ErrorSummaryComp>
  );
});
