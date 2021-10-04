import { ChildProcess, SpawnOptions } from "child_process";
import { Reducer, useMemo, useReducer } from "react";
import chalk from "chalk";

import { exec } from "../utils";

interface ParralelItem<T extends any> {
  command: string;
  spawnOptions: SpawnOptions;
  ctx: T;
}

type Status = "ready" | "run" | "end";

interface ParallelTask<T extends any> extends ParralelItem<T> {
  child: ChildProcess;
  status: Status;
}

type ParallelAction = { index: number } & (
  | { type: "ATTACH"; payload: ChildProcess }
  | { type: "STATUS"; payload: "ready" | "run" | "end" }
);

export const useParallel = <T extends any>(items: ParralelItem<T>[]) => {
  const children = useMemo(
    () =>
      items.map((item, index) => {
        const child = exec(item.command, item.spawnOptions);
        child.on("close", (code) => {
          if (code !== 0) {
            console.warn(chalk.red(`"${item.command}" exited with code: ${code}`));
          }
          dispatch({ type: "STATUS", index, payload: "end" });
        });
        return {
          ...item,
          status: "ready" as Status,
          child,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const reducer: Reducer<ParallelTask<T>[], ParallelAction> = (state, action) => {
    return state.map((item, index) => {
      if (index !== action.index) {
        return item;
      }
      switch (action.type) {
        case "STATUS":
          return {
            ...item,
            status: action.payload,
          };
        default:
          return item;
      }
    });
  };

  const [state, dispatch] = useReducer(reducer, children);

  return { tasks: state };
};
