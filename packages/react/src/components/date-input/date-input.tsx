import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import cn from "classnames";

import { Label } from "../label";
import { NumberInput, NumberInputProps } from "../number-input";
import styles from "./styles.module.scss";

export interface DateInputProps extends ComponentPropsWithoutRef<"div"> {
  id?: string;
  error?: string;
  required?: boolean;
  dayProps?: NumberInputProps;
  monthProps?: NumberInputProps;
  yearProps?: NumberInputProps;
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
}

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(function DateInput(
  {
    id = "date-input",
    dayProps,
    monthProps,
    yearProps,
    dayLabel = "Day",
    monthLabel = "Month",
    yearLabel = "Year",
    error,
    required,
    className,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(styles.govukDateInput, styles.lbhDateInput, className)}
      {...props}
    >
      <div className={styles.govukDateInputItem}>
        <Label htmlFor={`${id}-day`}>{dayLabel}</Label>
        <NumberInput
          id={`${id}-day`}
          className={cn(styles.govukDateInputInput, styles.govukInputWidth2)}
          name="day"
          required={required}
          maxLength={2}
          min={1}
          max={31}
          padStart={2}
          {...dayProps}
        />
      </div>
      <div className={styles.govukDateInputItem}>
        <Label htmlFor={`${id}-month`}>{monthLabel}</Label>
        <NumberInput
          id={`${id}-month`}
          className={cn(styles.govukDateInputInput, styles.govukInputWidth2)}
          name="month"
          required={required}
          maxLength={2}
          min={1}
          max={12}
          padStart={2}
          {...monthProps}
        />
      </div>
      <div className={styles.govukDateInputItem}>
        <Label htmlFor={`${id}-year`}>{yearLabel}</Label>
        <NumberInput
          id={`${id}-year`}
          className={cn(styles.govukDateInputInput, styles.govukInputWidth4)}
          name="year"
          required={required}
          maxLength={4}
          padStart={4}
          {...yearProps}
        />
      </div>
    </div>
  );
});
