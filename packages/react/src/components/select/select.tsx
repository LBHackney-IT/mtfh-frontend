import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";
import { widthOverrides } from "../../utils";

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  error?: boolean;
  override?: number;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, className, override, ...props },
  ref,
) {
  const selectClasses = classNames(
    styles.govukSelect,
    styles.lbhSelect,
    { [styles.govukSelectError]: error },
    widthOverrides(override),
    className,
  );
  return <select ref={ref} className={selectClasses} {...props} />;
});
