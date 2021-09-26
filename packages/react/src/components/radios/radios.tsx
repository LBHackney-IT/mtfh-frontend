import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  cloneElement,
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

export interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  hint?: string;
  children: ReactNode;
  conditionalId?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, className, type = "radio", hint, children, conditionalId, error, ...props },
  ref,
) {
  return (
    <div className={cn(styles.govukRadiosItem, className)}>
      <input
        ref={ref}
        id={id}
        className={styles.govukRadiosInput}
        type={type}
        aria-describedby={hint ? `${id}-hint` : undefined}
        data-aria-controls={conditionalId}
        {...props}
      />
      <Label className={styles.govukRadiosLabel} htmlFor={id}>
        {children}
      </Label>
      {hint ? (
        <Hint id={`${id}-hint`} className={styles.govukRadiosHint}>
          {hint}
        </Hint>
      ) : null}
    </div>
  );
});

export const RadioDivider = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  function RadioDivider({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn(styles.govukRadiosDivider, className)} {...props} />
    );
  },
);

export const RadioConditional = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function RadioConditional(props, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        styles.govukRadiosConditional,
        "govuk-radios__conditional",
        "govuk-radios__conditional--hidden",
      )}
      {...props}
    />
  );
});

export interface RadioGroupProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "base" | "sm";
  inline?: boolean;
  name?: string;
  error?: string;
  required?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { variant = "base", inline = false, name, children, error, required, ...props },
  ref,
) {
  const localRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const init = async (ref: HTMLElement) => {
      const { default: LBHRadios } = await import(
        "lbh-frontend/lbh/components/lbh-radios/radios"
      );
      const radios = new LBHRadios(ref);
      radios.init();
    };
    /* istanbul ignore else */
    if (localRef.current && window !== undefined) {
      init(localRef.current);
    }
  }, []);

  const hasConditionals = useMemo(
    () =>
      Children.toArray(children).some(
        (child) => isValidElement(child) && child.type === RadioConditional,
      ),
    [children],
  );

  return (
    <div
      ref={mergeRefs([localRef, ref])}
      className={cn(
        styles.govukRadios,
        {
          [styles.govukRadiosSmall]: variant === "sm",
          [styles.govukRadiosInline]: inline,
          [styles.govukRadiosConditionals]: hasConditionals,
        },
        styles.lbhRadios,
      )}
      {...props}
    >
      {Children.map(
        children,
        (child) =>
          child &&
          isValidElement(child) &&
          cloneElement(child, {
            name,
            required,
            ...child.props,
          }),
      )}
    </div>
  );
});
