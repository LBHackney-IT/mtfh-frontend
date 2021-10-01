import React, { FC, useEffect, useMemo, useReducer, Reducer } from "react";
import { Text } from "ink";
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
  if (program) {
    return child.spawn(program, args, options);
  }
  return child.spawn("yarn", ["start"], options);
};

interface AppProps {
  scope?: string[];
}

const App: FC<AppProps> = ({ scope = [] }) => {
  const activeApps = useMemo(() => {
    if (scope.length) {
      Object.keys(apps).forEach((key) => {
        const app = apps[key];
        if (!scope.includes(key) && app && !app.required) {
          delete apps[key];
        }
      });
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
            payload: url[0].replace("Loopback:", ""),
          });
        }

        const error = output.match(/ERROR in (.*)$/gm);
        if (error) {
          errorHandler(error[0]);
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
    <>
      {state.map((app, idx) => {
        if (app.status === "start") {
          return (
            <Text key={idx} color={colours.start}>
              {app.name}: {app.url || app.status}
            </Text>
          );
        }
        if (app.status === "error") {
          return (
            <Text key={idx} color={colours.error}>
              {app.name}: {app.error || app.status}
            </Text>
          );
        }

        if (app.status === "live") {
          return (
            <Text key={idx} color={colours.live}>
              {app.name}: {app.url || app.status}
            </Text>
          );
        }
        return null;
      })}
    </>
  );
};

module.exports = App;
export default App;
