import React, { useState } from "react";

import chalk from "chalk";
import { Text, useInput } from "ink";

interface TextInputProps {
  onSubmit?: (value: string) => void;
  mask?: boolean;
  placeholder?: string;
}

export const TextInput = ({ onSubmit, mask = false, placeholder }: TextInputProps) => {
  const [text, setText] = useState("");
  useInput((input, key) => {
    if (
      key.upArrow ||
      key.downArrow ||
      key.leftArrow ||
      key.rightArrow ||
      (key.ctrl && input === "c") ||
      key.tab ||
      (key.shift && key.tab)
    ) {
      return;
    }

    let nextValue = text;

    if (key.return) {
      if (onSubmit) {
        onSubmit(text);
      }

      return;
    }

    if (key.backspace || key.delete) {
      if (text.length) {
        nextValue = nextValue.slice(0, -1);
      }
    } else {
      nextValue = nextValue + input;
    }
    if (nextValue !== text) {
      setText(nextValue);
    }
  });

  return (
    <Text>
      {placeholder && <Text color="gray">({placeholder}) </Text>}
      {mask ? "*".repeat(text.length) : text}
      {chalk.inverse(" ")}
    </Text>
  );
};
