import React, { useState } from "react";

import { Box, Text, useInput } from "ink";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  items: MultiSelectOption[];
  onSubmit: (selected: string[]) => void;
}

const Cursor = ({ isActive = false }) => (
  <Box marginRight={1}>
    <Text color={isActive ? "blue" : undefined}>{isActive ? ">" : " "}</Text>
  </Box>
);

const Checkbox = ({ checked = false }) => (
  <Box marginRight={1}>
    <Text>
      [ <Text color={checked ? "green" : "gray"}>{checked ? "√" : "x"}</Text> ]
    </Text>
  </Box>
);

export const MultiSelect = ({ items, onSubmit }: MultiSelectProps) => {
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<typeof items[0]["value"][]>([]);

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor(cursor - 1 < 0 ? items.length - 1 : cursor - 1);
    }

    if (key.downArrow) {
      setCursor(cursor + 1 > items.length - 1 ? 0 : cursor + 1);
    }

    if (input === " ") {
      const exists = selected.includes(items[cursor].value);
      if (exists) {
        setSelected(selected.filter((item) => item !== items[cursor].value));
      } else {
        setSelected([...selected, items[cursor].value]);
      }
    }

    if (key.return) {
      onSubmit(selected);
    }
  });

  return (
    <Box flexDirection="column">
      <Text color="gray">
        Use arrow keys to navigate, space to select, and enter to confirm.
      </Text>
      {items.map((item, index) => {
        const isActive = cursor === index;
        const isSelected = selected.includes(item.value);
        return (
          <Box key={item.value}>
            <Cursor isActive={isActive} />
            <Checkbox checked={isSelected} />
            <Text color={isSelected ? "green" : undefined}>{item.label}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
