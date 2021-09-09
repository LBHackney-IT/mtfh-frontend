import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";

import { pluralize, widthOverrides } from "../../utils";
import { ErrorMessage } from "../error-message";
import { Hint } from "../hint";

import styles from "./styles.module.scss";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  maxLength?: number;
  error?: boolean;
  override?: number;
}

const getLengthOfValue = (
  initialValue: string | number | readonly string[] | undefined,
) => {
  if (typeof initialValue === "string") {
    return initialValue.length;
  }
  if (Array.isArray(initialValue)) {
    return initialValue.join(",").length;
  }
  return String(initialValue || "").length;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { maxLength, error, className, onChange, override, ...props },
  ref,
) {
  const { value, defaultValue } = props;
  const isControlled = value !== undefined;
  const initialValue = value || defaultValue;

  const [characterCount, setCharacterCount] = useState(getLengthOfValue(initialValue));

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (
        event?.currentTarget?.value !== undefined &&
        !isControlled &&
        maxLength !== undefined
      ) {
        setCharacterCount(String(event.currentTarget.value).length);
      }

      if (typeof onChange === "function") {
        onChange(event);
      }
    },
    [onChange, maxLength, isControlled],
  );

  const exceedingValue = useMemo(
    () =>
      maxLength !== undefined &&
      maxLength - (isControlled ? getLengthOfValue(value) : characterCount),
    [maxLength, characterCount, value, isControlled],
  );

  const textareaClasses = classNames(
    styles.govukTextarea,
    styles.lbhTextarea,
    { [styles.govukTextareaError]: error },
    styles.govukCharacterCount,
    styles.lbhCharacterCount,
    widthOverrides(override),
    className,
  );

  const messageClasses = classNames(
    styles.govukCharacterCountMessage,
    widthOverrides(override),
  );

  const component = (
    <>
      <textarea
        ref={ref}
        className={textareaClasses}
        onChange={onChangeHandler}
        {...props}
      />
      {maxLength !== undefined && exceedingValue !== false && (
        <>
          {exceedingValue >= 0 ? (
            <Hint className={messageClasses} aria-live="polite">
              You have {exceedingValue} {pluralize("character", exceedingValue)} remaining
            </Hint>
          ) : (
            <ErrorMessage className={messageClasses} aria-live="polite">
              You have {Math.abs(exceedingValue)} {pluralize("character", exceedingValue)}{" "}
              too many
            </ErrorMessage>
          )}
        </>
      )}
    </>
  );

  return maxLength !== undefined ? (
    <div className={styles.govukCharacterCount}>{component}</div>
  ) : (
    component
  );
});
