import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import * as RadixDialog from "@radix-ui/react-dialog";
import cn from "classnames";

import { Heading } from "../heading";
import { VisuallyHidden } from "../visually-hidden";
import styles from "./styles.module.scss";

export interface DialogProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onDismiss: () => void;
  title: string;
  dismissText?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { isOpen, onDismiss, dismissText = "Close", children, className, title, ...props },
  ref,
) {
  return (
    <RadixDialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onDismiss();
        }
      }}
    >
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.lbhDialogOverlay} />
        <RadixDialog.Content
          ref={ref}
          className={cn(styles.lbhDialog, styles.lbhDialogRadix, className)}
          aria-describedby={undefined}
          aria-label={title}
          {...props}
        >
          <RadixDialog.Title asChild>
            <Heading variant="h2" className={styles.lbhDialogTitle}>
              {title}
            </Heading>
          </RadixDialog.Title>
          <RadixDialog.Close asChild>
            <button type="button" onClick={onDismiss} className={styles.lbhDialogClose}>
              <VisuallyHidden>{dismissText}</VisuallyHidden>

              <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
                <path
                  d="M-0.0501709 1.36379L1.36404 -0.050415L12.6778 11.2633L11.2635 12.6775L-0.0501709 1.36379Z"
                  fill="#0B0C0C"
                />
                <path
                  d="M11.2635 -0.050293L12.6778 1.36392L1.36404 12.6776L-0.0501709 11.2634L11.2635 -0.050293Z"
                  fill="#0B0C0C"
                />
              </svg>
            </button>
          </RadixDialog.Close>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});

export const DialogActions = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  function DialogActions({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn(styles.lbhDialogActions, className)} {...props} />
    );
  },
);
