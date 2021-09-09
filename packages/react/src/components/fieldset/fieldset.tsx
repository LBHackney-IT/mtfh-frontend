import React, {
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";
import cn from "classnames";

import { widthOverrides } from "../../utils";
import { ErrorMessage } from "../error-message";
import { VisuallyHidden } from "../visually-hidden";
import styles from "./styles.module.scss";

export interface FieldsetProps extends ComponentPropsWithoutRef<"fieldset"> {
  heading: string | ReactElement<ComponentPropsWithoutRef<"h1">>;
  variant?: "small" | "medium" | "large" | "xlarge" | "hidden";
  indent?: boolean;
  error?: boolean | string;
  override?: number;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(function Fieldset(
  {
    variant = "medium",
    indent = false,
    error,
    heading,
    children,
    className,
    override,
    ...props
  },
  ref,
) {
  const legend = useMemo(() => {
    const legendOutput = (
      <legend
        className={cn(styles.govukFieldsetLegend, {
          [styles.govukFieldsetLegendS]: variant === "small",
          [styles.govukFieldsetLegendM]: variant === "medium",
          [styles.govukFieldsetLegendL]: variant === "large",
          [styles.govukFieldsetLegendXl]: variant === "xlarge",
        })}
      >
        {typeof heading !== "string"
          ? isValidElement(heading) &&
            cloneElement(heading, {
              className: cn(styles.govukFieldsetHeading, heading.props.className),
            })
          : heading}
        {error && (
          <VisuallyHidden className={styles.fieldsetError}>{error}</VisuallyHidden>
        )}
      </legend>
    );

    return variant === "hidden" ? (
      <VisuallyHidden>{legendOutput}</VisuallyHidden>
    ) : (
      legendOutput
    );
  }, [variant, heading, error]);

  return (
    <fieldset
      ref={ref}
      className={cn(
        styles.govukFieldset,
        styles.lbhFieldset,
        {
          [styles.fieldsetIndent]: indent,
          [styles.fieldsetHasError]: !!error,
        },
        widthOverrides(override),
        className,
      )}
      {...props}
    >
      {legend}
      <div className={styles.fieldsetContent}>
        {error && <ErrorMessage aria-hidden="true">{error}</ErrorMessage>}
        {children}
      </div>
    </fieldset>
  );
});
