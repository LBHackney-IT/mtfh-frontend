import React, { useState } from "react";

import { Box, Text } from "ink";

import { useApps, useSeries } from "../../hooks";
import { getPackageManager } from "../../utils";
import { TextInput } from "../text-input";

import type { Repo } from "../../types";

interface InstallDependenciesProps {
  repos: Repo[];
  onComplete: (repos: Repo[]) => void;
}

export const InstallDependencies = ({ repos, onComplete }: InstallDependenciesProps) => {
  const { apps } = useApps();
  const [install, setInstall] = useState(false);
  const { output, completed, active } = useSeries<Repo>(
    install
      ? repos.map((repo) => {
          const config = apps[repo.name];

          return {
            command: () => {
              const packageManager = getPackageManager(config.path);
              return packageManager === "yarn" ? `yarn` : "npm install";
            },
            ctx: repo,
            spawnOptions: {
              cwd: config.path,
            },
          };
        })
      : null,
    {
      onComplete,
    },
  );

  if (!install) {
    return (
      <Box flexDirection="column">
        <Text>Should we install the projects dependencies?</Text>
        <TextInput
          placeholder="yes/no"
          onSubmit={(input) => {
            const key = input[0]?.toLowerCase() || "y";
            if (key === "y") {
              setInstall(true);
            } else {
              onComplete([]);
            }
          }}
        />
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      {completed.map((item) => (
        <Box key={item.ctx.id}>
          <Text color={item.success ? "green" : "red"}>
            {item.success ? "√" : "x"} Dependencies installed: {item.ctx.name}
          </Text>
        </Box>
      ))}
      {active && <Text color="blue">Installing dependencies: {active.name}</Text>}
      <Text>{output.split("\n").slice(-5).join("\n")}</Text>
    </Box>
  );
};
