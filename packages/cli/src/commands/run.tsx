import fs from "fs";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Text } from "ink";

import { useApps, useParallel } from "../hooks";

interface StartTask {
  name: string;
  url: string;
  output: string;
  status: "start" | "live" | "error";
}

const colours = {
  start: "yellow",
  live: "green",
  error: "red",
};

const statuses = {
  start: "Launching...",
  live: "",
  error: "Unexpected Error",
};

interface RunCommandProps {
  scopes: string[];
}

const RunCommand = ({ scopes }: RunCommandProps) => {
  const { apps } = useApps();

  const activeApps = useMemo(() => {
    return Object.values(apps).filter((app) => {
      if (!fs.existsSync(app.path)) {
        return false;
      }

      if (app.required) {
        return true;
      }

      if (scopes.length) {
        return !!scopes.find((scope) => app.name.includes(scope));
      }

      return false;
    });
  }, [apps, scopes]);

  const { tasks } = useParallel(
    activeApps.map((app) => ({
      ctx: app,
      command: "npm run start",
      spawnOptions: {
        cwd: app.path,
      },
    })),
  );

  const [results, setResults] = useState<StartTask[]>(
    tasks.map((item) => ({ name: item.ctx.name, url: "", output: "", status: "start" })),
  );

  useEffect(() => {
    tasks.forEach(({ child }, index) => {
      child.stderr?.on("data", (data) => {
        const output = data.toString("utf-8").replace(/[\r|\n]+/gm, "\n");
        const urlMatch = output.match(/Loopback:\s(.*)/);
        if (urlMatch) {
          setResults((prevResults) => {
            const update = [...prevResults];
            update[index].url = urlMatch[1];
            return update;
          });
        }

        if (output.indexOf("Error: listen EADDRINUSE") !== -1) {
          setResults((prevResults) => {
            const update = [...prevResults];
            update[index].output = "PORT is already in use";
            update[index].status = "error";
            return update;
          });
        }

        const errorMatch = output.match(/ERROR in (.*)$/m);
        if (errorMatch) {
          setResults((prevResults) => {
            const update = [...prevResults];
            update[index].output = errorMatch[1];
            update[index].status = "error";
            return update;
          });
        }
      });

      child.stdout?.on("data", (data) => {
        const output = data.toString("utf-8").replace(/[\r|\n]+/gm, "\n");
        if (output.indexOf("No issues found.") !== -1) {
          setResults((prevResults) => {
            const update = [...prevResults];
            update[index].output = "";
            update[index].status = "live";
            return update;
          });
        }
      });

      child.on("close", () => {
        setResults((prevResults) => {
          const update = [...prevResults];
          update[index].status = "error";
          return update;
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexDirection="column" width={150}>
      <Box width="100%">
        <Box width="25%">
          <Text>Project</Text>
        </Box>
        <Box width="25%">
          <Text>URL</Text>
        </Box>
        <Box width="50%">
          <Text>Info</Text>
        </Box>
      </Box>
      {results.map((task) => {
        return (
          <Box key={task.name} width="100%">
            <Box width="25%">
              <Text color={colours[task.status]}>{task.name}</Text>
            </Box>
            <Box width="25%">
              <Text color={colours[task.status]}>
                {task.url || "Waiting for dev server..."}
              </Text>
            </Box>
            <Box width="50%">
              <Text color={colours[task.status]}>
                {task.output || statuses[task.status]}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default RunCommand;
