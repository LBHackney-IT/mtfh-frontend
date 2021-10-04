import fs from "fs";
import chalk from "chalk";
import { BehaviorSubject } from "rxjs";
import type { Config } from "../types";
import { getSystemFile } from "../utils";

const configJsonPath = getSystemFile("config.json");

const readConfig = () => {
  const configJson = fs.readFileSync(configJsonPath, "utf-8");
  let config: Config = {};
  try {
    config = JSON.parse(configJson);
  } catch {
    console.log(chalk.red(`Unable to parse config: ${configJsonPath}`));
  }

  return config;
};

const writeConfig = (config: Config) => {
  fs.writeFileSync(configJsonPath, JSON.stringify(config));
};

export const $config = new BehaviorSubject(readConfig());

$config.subscribe(writeConfig);
