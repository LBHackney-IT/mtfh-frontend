import { ChildProcess, SpawnOptions } from "child_process";

import { useEffect, useState } from "react";

import chalk from "chalk";

import { exec, series } from "../utils";

interface SeriesItem<T extends any> {
  command: string | ((ctx: T) => string);
  spawnOptions: SpawnOptions;
  ctx: T;
}

interface SeriesOptions<T> {
  onClose?: (ctx: T, code: number | null) => void;
  onComplete: (success: T[]) => void;
}

export const useSeries = <T extends any>(
  items: SeriesItem<T>[] | null,
  { onClose, onComplete }: SeriesOptions<T>,
) => {
  const [output, setOutput] = useState("");
  const [active, setActive] = useState<T>();
  const [completed, setCompleted] = useState<{ ctx: T; success: boolean }[]>([]);
  const [itemsRef, setItems] = useState(items);

  useEffect(() => {
    if (!itemsRef) {
      setItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (!itemsRef) return;
    let running: ChildProcess | null = null;
    const actions = itemsRef.map(({ command, ctx, spawnOptions }) => async () => {
      return new Promise<void>((resolve) => {
        const child = exec(
          typeof command === "function" ? command(ctx) : command,
          spawnOptions,
        );
        setActive(ctx);
        running = child;

        child.stderr?.on("data", (data) => {
          const newOutput = data.toString("utf-8").replace(/[\r|\n]+/gm, "\n");
          setOutput((prev) => prev + newOutput);
        });

        child.stdout?.on("data", (data) => {
          const newOutput = data.toString("utf-8").replace(/[\r|\n]+/gm, "\n");
          setOutput((prev) => prev + newOutput);
        });

        child.on("close", (code) => {
          running = null;
          if (code !== 0) {
            console.warn(chalk.red(`"${command}" exited with code: ${code}`));
          }
          setOutput("");
          setCompleted((prevCompleted) => [
            ...prevCompleted,
            {
              ctx,
              success: code === 0,
            },
          ]);
          if (onClose) {
            onClose(ctx, code);
          }
          resolve();
        });
      });
    });
    series(actions);

    return () => {
      if (running) {
        running.kill();
      }
    };

    // Spawned child processes should be considered expensive.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsRef]);

  useEffect(() => {
    if (itemsRef && completed.length === itemsRef.length) {
      setActive(undefined);
      onComplete(
        itemsRef.filter((item, i) => !!completed[i].success).map(({ ctx }) => ctx),
      );
    }
  }, [itemsRef, completed, onComplete]);

  return { output, active, completed };
};
