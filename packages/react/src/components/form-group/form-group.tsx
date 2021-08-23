import React, {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  useMemo,
} from "react"
import type * as Polymorphic from "@radix-ui/react-polymorphic"
import classNames from "classnames"

import { widthOverrides } from "../../utils"
import { ErrorMessage } from "../error-message"
import { Hint } from "../hint"
import { Label } from "../label"
import styles from "./styles.module.scss"

export interface FormGroupProps {
  id: string
  label?: string
  name?: string
  hint?: string
  error?: string | false
  required?: boolean
  children: ReactElement
  override?: number
}

export type FormGroupComponent = Polymorphic.ForwardRefComponent<
  "div",
  FormGroupProps
>

export const FormGroup: FormGroupComponent = forwardRef(function FormGroup(
  {
    as: FormGroupComp = "div",
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
  ref,
) {
  const formGroupClasses = classNames(
    styles.govukFormGroup,
    {
      [styles.govukFormGroupError]: !!error,
    },
    styles.lbhFormGroup,
    widthOverrides(override),
    className,
  )

  const describedBy = useMemo(() => {
    const ids: string[] = []
    if (hint) {
      ids.push(`${id}-hint`)
    }
    if (error) {
      ids.push(`${id}-error`)
    }
    return ids.join(" ") || undefined
  }, [id, hint, error])

  const labelComp =
    typeof FormGroupComp === "string" &&
    (FormGroupComp as string) === "fieldset"
      ? "legend"
      : "label"

  return (
    <FormGroupComp
      ref={ref}
      id={id}
      className={formGroupClasses}
      aria-describedby={labelComp === "legend" ? describedBy : undefined}
      {...props}
    >
      {!!label && (
        <Label
          as={labelComp}
          htmlFor={labelComp === "label" ? `${id}-field` : undefined}
        >
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
            "aria-describedby": labelComp === "label" ? describedBy : undefined,
            ...children.props,
          }),
        )}
    </FormGroupComp>
  )
})
