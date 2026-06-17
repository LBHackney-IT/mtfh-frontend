import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";
import { widthOverrides } from "../../utils";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  override?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, className, override, ...props },
  ref,
) {
  const inputClasses = classNames(
    styles.govukInput,
    styles.lbhInput,
    {
      [styles.govukInputError]: error,
    },
    widthOverrides(override),
    className,
  );

  return <input ref={ref} className={inputClasses} {...props} />;
});
