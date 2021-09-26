import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import cn from "classnames";
import mergeRefs from "react-merge-refs";

import { Hint } from "../hint";
import { Label } from "../label";
import styles from "./styles.module.scss";

export interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  hint?: string;
  children: ReactNode;
  conditionalId?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, className, type = "checkbox", hint, children, conditionalId, error, ...props },
  ref,
) {
  return (
    <div className={cn(styles.govukCheckboxesItem, className)}>
      <input
        ref={ref}
        id={id}
        className={styles.govukCheckboxesInput}
        type={type}
        aria-describedby={hint ? `${id}-hint` : undefined}
        data-aria-controls={conditionalId}
        {...props}
      />
      <Label className={styles.govukCheckboxesLabel} htmlFor={id}>
        {children}
      </Label>
      {hint ? (
        <Hint id={`${id}-hint`} className={styles.govukCheckboxesHint}>
          {hint}
        </Hint>
      ) : null}
    </div>
  );
});

export const CheckboxConditional = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function CheckboxConditional(props, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        styles.govukCheckboxesConditional,
        "govuk-checkboxes__conditional",
        "govuk-checkboxes__conditional--hidden",
      )}
      {...props}
    />
  );
});

export interface CheckboxGroupProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "base" | "small";
  error?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup({ variant = "base", children, error, ...props }, ref) {
    const localRef = useRef<HTMLDivElement>();

    useEffect(() => {
      const init = async (ref: HTMLElement) => {
        const { default: LBHCheckboxes } = await import(
          "lbh-frontend/lbh/components/lbh-checkboxes/checkboxes"
        );
        const checkboxes = new LBHCheckboxes(ref);
        checkboxes.init();
      };
      /* istanbul ignore else */
      if (localRef.current && window !== undefined) {
        init(localRef.current);
      }
    }, []);

    const hasConditionals = useMemo(
      () =>
        Children.toArray(children).some(
          (child) => isValidElement(child) && child.type === CheckboxConditional,
        ),
      [children],
    );

    return (
      <div
        ref={mergeRefs([localRef, ref])}
        className={cn(
          styles.govukCheckboxes,
          {
            [styles.govukCheckboxesSmall]: variant === "small",
            [styles.govukCheckboxesConditionals]: hasConditionals,
          },
          styles.lbhCheckboxes,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
