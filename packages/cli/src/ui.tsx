import React, { FC, useEffect, useMemo, useReducer, Reducer } from "react";
import { Box, Text } from "ink";
import child, { SpawnOptionsWithoutStdio } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

const appJsonPath = path.join(os.homedir(), ".mtfh", "app.json");
const appJson = fs.readFileSync(appJsonPath, "utf-8");
let apps: Record<string, { path: string; required: boolean }> = {};
try {
  apps = JSON.parse(appJson);
} catch {
  console.log(chalk.red(`Unable to parse config: ${appJsonPath}`));
}

const colours = {
  start: "yellow",
  live: "green",
  error: "red",
};

type AppState = {
  name: string;
  path: string;
  status: string;
  url?: string;
  error?: string;
};
type Action = { index: number } & (
  | { type: "OK" }
  | { type: "URL"; payload: string }
  | { type: "ERROR"; payload: string }
);

const reducer: Reducer<AppState[], Action> = (state, action) => {
  switch (action.type) {
    case "OK":
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          status: "live",
          error: undefined,
        };
      });
    case "URL":
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          url: action.payload,
        };
      });
    case "ERROR":
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          error: action.payload,
          status: "error",
        };
      });
    default:
      return state;
  }
};

const exec = (command: string, options: SpawnOptionsWithoutStdio = {}) => {
  const [program, ...args] = command.split(" ");
  if (!program) {
    console.log(chalk.red(`Unable to exec command: ${command}`));
    process.exit();
  }
  return child.spawn(program, args, { ...options, shell: true });
};

interface AppProps {
  scope?: string[];
}

const App: FC<AppProps> = ({ scope = [] }) => {
  const activeApps = useMemo(() => {
    Object.keys(apps).forEach((key) => {
      const app = apps[key];

      if (app && !fs.existsSync(app.path)) {
        delete apps[key];
      }
    });

    if (scope.length) {
      Object.keys(apps).forEach((key) => {
        const app = apps[key];
        if (!scope.includes(key) && app && !app.required) {
          delete apps[key];
        }
      });

      const missingApps = scope.filter((name) => !Object.keys(apps).includes(name));
      if (missingApps.length) {
        console.log(chalk.red(`Cannot find apps ${missingApps}`));
        process.exit(1);
      }
    }

    return Object.entries(apps).map(([key, value]) => ({
      name: key,
      ...value,
      status: "start",
    }));
  }, [scope]);

  const [state, dispatch] = useReducer(reducer, activeApps);
  useEffect(() => {
    state.forEach((app, index) => {
      let hasThrown = false;
      const command = fs.existsSync(path.resolve(app.path, "yarn.lock"))
        ? "yarn start"
        : "npm run start";

      const process = exec(command, {
        cwd: app.path,
      });

      const errorHandler = (message: string) => {
        hasThrown = true;
        dispatch({
          type: "ERROR",
          index,
          payload: message,
        });
      };

      process.stderr.on("data", (newOutput) => {
        const output = newOutput.toString("utf8");
        const url = output.match(/Loopback:\s(.*)/gm);
        if (url) {
          dispatch({
            type: "URL",
            index,
            payload: url[0].replace("Loopback: ", ""),
          });
        }

        const error = output.match(/ERROR in (.*)$/gm);
        if (error) {
          errorHandler(error[0].replace("ERROR in ", ""));
        }

        const addressInUse = output.indexOf("Error: listen EADDRINUSE");
        if (addressInUse !== -1) {
          errorHandler("PORT is already in use");
        }
      });

      process.stdout.on("data", (newOutput) => {
        const output = newOutput.toString("utf8");
        if (output.indexOf("No issues found.") !== -1) {
          hasThrown = false;
          dispatch({
            type: "OK",
            index,
          });
        }
      });

      process.on("exit", () => {
        if (!hasThrown) {
          errorHandler("App unexcpectedly exited");
        }
      });
    });
  }, []);

  return (
    <Box flexDirection="column" width={110}>
      <Box justifyContent="space-between" width="100%">
        <Box borderStyle="classic" width="25%" justifyContent="center">
          <Text>Name</Text>
        </Box>
        <Box borderStyle="classic" width="25%" justifyContent="center">
          <Text>URL</Text>
        </Box>
        <Box borderStyle="classic" width="50%" justifyContent="center">
          <Text>Info</Text>
        </Box>
      </Box>
      {state.map((app, idx) => {
        return (
          <Box key={idx} width="100%" margin={0}>
            <Box width="25%" margin={0} paddingLeft={2}>
              <Text color={colours[app.status as keyof typeof colours]}>{app.name}</Text>
            </Box>
            <Box width="25%" margin={0} paddingLeft={2}>
              <Text color={colours[app.status as keyof typeof colours]}>
                {app.url || ""}
              </Text>
            </Box>
            <Box width="50%" margin={0} paddingLeft={2}>
              <Text color={colours[app.status as keyof typeof colours]}>
                {app.error || app.status}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

module.exports = App;
export default App;
