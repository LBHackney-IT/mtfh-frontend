import fs from "fs";

import chalk from "chalk";
import { BehaviorSubject } from "rxjs";

import { getSystemFile } from "../utils";

import type { AppConfig } from "../types";

const appJsonPath = getSystemFile("app.json");

const readAppConfig = () => {
  const appJson = fs.readFileSync(appJsonPath, "utf-8");
  let apps: AppConfig = {};
  try {
    apps = JSON.parse(appJson);
  } catch {
    console.log(chalk.red(`Unable to parse app config: ${appJsonPath}`));
  }

  return apps;
};

const writeAppConfig = (apps: AppConfig) => {
  fs.writeFileSync(appJsonPath, JSON.stringify(apps));
};

export const $apps = new BehaviorSubject(readAppConfig());

$apps.subscribe(writeAppConfig);
