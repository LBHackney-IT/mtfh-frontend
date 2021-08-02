import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  forwardRef,
  useMemo,
} from "react";
import classNames from "classnames";

import { widthOverrides } from "../../utils";
import { ErrorMessage } from "../error-message";
import { Hint } from "../hint";
import { Label } from "../label";
import styles from "./styles.module.scss";

export interface FormGroupProps extends ComponentPropsWithoutRef<"div"> {
  id: string;
  label?: string;
  name?: string;
  hint?: string;
  error?: string | false;
  required?: boolean;
  children: ReactElement;
  override?: number;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  function FormGroup(
    {
      id,
      name,
      label,
      hint,
      error,
      required,
      children,
      className,
      override,
      ...props
    },
    ref
  ) {
    const formGroupClasses = classNames(
      styles.govukFormGroup,
      {
        [styles.govukFormGroupError]: !!error,
      },
      styles.lbhFormGroup,
      widthOverrides(override),
      className
    );

    const describedBy = useMemo(() => {
      const ids: string[] = [];
      if (hint) {
        ids.push(`${id}-hint`);
      }
      if (error) {
        ids.push(`${id}-error`);
      }
      return ids.join(" ");
    }, [id, hint, error]);

    return (
      <div ref={ref} id={id} className={formGroupClasses} {...props}>
        {!!label && (
          <Label htmlFor={`${id}-field`}>
            {label}
            {required ? <sup aria-hidden="true">*</sup> : ""}
          </Label>
        )}
        {!!hint && <Hint id={`${id}-hint`}>{hint}</Hint>}
        {!!error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
        {!!children &&
          Children.only(
            cloneElement(children, {
              id: `${id}-field`,
              name,
              required,
              error: !!error,
              "aria-describedby": describedBy || undefined,
              ...children.props,
            })
          )}
      </div>
    );
  }
);
