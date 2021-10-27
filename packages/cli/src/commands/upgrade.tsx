import { useEffect } from "react";

import { exec } from "../utils";

// Instead of having the generators as a dependency
// We call npx yo to automatically run the latest version on npm
// We pipe our main process to the child and
// pipe the child's output back to main
const UpgradeCommand = () => {
  useEffect(() => {
    const child = exec(`npx yo @hackney/mfe:upgrade --color`, {
      stdio: [process.stdout],
    });
    child.stderr?.pipe(process.stdout);
    child.stdout?.pipe(process.stdout);

    if (child.stdin) {
      process.stdin.pipe(child.stdin);
      process.stdin.resume();
    }
  }, []);

  return null;
};

export default UpgradeCommand;
