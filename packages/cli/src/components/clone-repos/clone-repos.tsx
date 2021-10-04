import fs from "fs";
import path from "path";
import React, { useState } from "react";
import chalk from "chalk";
import { Box, Text } from "ink";

import { useApps, useSeries } from "../../hooks";
import type { Repo } from "../../types";
import { TextInput } from "../text-input";

interface CloneReposProps {
  repos: Repo[];
  onComplete: (repos: Repo[]) => void;
}

export const CloneRepos = ({ repos, onComplete }: CloneReposProps) => {
  const { add } = useApps();
  const [cwd, setCwd] = useState<string>();
  const { output, completed, active } = useSeries<Repo>(
    cwd
      ? repos.map((repo) => ({
          command: `git clone --progress ${repo.clone_url}`,
          ctx: repo,
          spawnOptions: {
            cwd,
          },
        }))
      : null,
    {
      onComplete: (completedRepos) => {
        if (!cwd) return;
        add(completedRepos, cwd);
        onComplete(repos);
      },
    },
  );

  if (!cwd) {
    return (
      <Box flexDirection="column">
        <Text>
          Set the path to the existing directory where the repos should be installed:
        </Text>
        <Text color="gray">CWD: {process.cwd()}</Text>
        <TextInput
          placeholder="."
          onSubmit={(input) => {
            const dir = input || ".";
            const resolvePath = path.isAbsolute(dir)
              ? dir
              : path.resolve(process.cwd(), dir);
            try {
              const stat = fs.lstatSync(resolvePath);
              if (stat.isDirectory()) {
                setCwd(resolvePath);
              }
            } catch {
              console.warn(chalk.red(`${resolvePath} is not an existing directory`));
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
            {item.success ? "√" : "x"} Git cloned: {item.ctx.name}
          </Text>
        </Box>
      ))}
      {active && <Text color="blue">Installing dependencies: {active.name}</Text>}
      <Text>{output.split("\n").slice(-5).join("\n")}</Text>
    </Box>
  );
};
