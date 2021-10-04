import { useEffect } from "react";
import { useApps } from "../hooks";
import { exec } from "../utils";

interface NewCommandProps {
  dir?: string;
}

// Instead of having the generators as a dependency
// We call npx yo to automatically run the latest version on npm
// We pipe our main process to the child and
// pipe the child's output back to main
const NewCommand = ({ dir }: NewCommandProps) => {
  const { register } = useApps();
  useEffect(() => {
    const child = exec(
      `npx yo @hackney/mfe:application ${dir ? `--dir=${dir} ` : ""}--color`,
      {
        stdio: [process.stdout],
      },
    );
    child.stderr?.pipe(process.stdout);
    child.stdout?.pipe(process.stdout);

    if (child.stdin) {
      process.stdin.pipe(child.stdin);
      process.stdin.resume();
    }

    child.stdout?.on("data", (data) => {
      const output = data.toString("utf8");
      const system = output.match(/\[SYSTEM\]\s"(.*)"\s(.*)/);

      if (system && system[1] && system[2]) {
        register([{ name: system[1], path: system[2] }]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default NewCommand;
