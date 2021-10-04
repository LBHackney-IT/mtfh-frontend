import fs from "fs";
import path from "path";

export const getPackageManager = (dir: string) => {
  const hasYarnLock = fs.existsSync(path.resolve(dir, "yarn.lock"));

  return hasYarnLock ? "yarn" : "npm";
};
