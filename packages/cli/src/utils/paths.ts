import fs from "fs";
import os from "os";
import path from "path";

const dir = path.join(os.homedir(), ".mtfh");

export const getSystemFile = (file: string) => {
  const fullPath = path.join(dir, file);

  if (!fs.existsSync(fullPath)) {
    // check dir exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(fullPath, "");
  }

  return fullPath;
};

export const getPath = async (value: string) => {
  const fullPath = path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Unable to access path: "${fullPath}"`);
  }

  return fullPath;
};
