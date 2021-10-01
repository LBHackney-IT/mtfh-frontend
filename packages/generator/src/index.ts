import path from "path";
import chalk from "chalk";
import Generator from "yeoman-generator";

import packageJson from "../package.json";
import Application from "./application";
import Upgrade from "./upgrade";

interface HackneyGeneratorOptions {
  dir: string;
  type: "application" | "upgrade";
  destinationRoot: string;
}

export default class HackneyGenerator extends Generator<HackneyGeneratorOptions> {
  constructor(args: string | string[], options: HackneyGeneratorOptions) {
    super(args, options);

    this.option("dir", { type: String });
    this.option("type", { type: String });

    if (args.length > 0 && !this.options.dir) {
      this.options.dir = args[0];
    }
  }

  public initializing() {
    this.log(`${chalk.bgGreen.black(` ${packageJson.name} `)} ${packageJson.version}`);

    try {
      const { stdout } = this.spawnCommandSync(
        "npm",
        ["view", "@hackney/generator-mfe@latest", "version"],
        { stdio: "pipe" },
      );

      const remoteVersion = stdout && stdout.toString && stdout.toString("utf8").trim();

      if (remoteVersion !== packageJson.version) {
        this.log(
          `${chalk.bgYellow.black(
            " Update available: ",
          )} The latest version of the generator is ${remoteVersion}`,
        );
      }
    } catch (e) {
      this.log(chalk.yellow("Unable to find remote on npm registry."));
    }
  }

  async selectChildGeneratorType() {
    if (!this.options.type) {
      const response = await this.prompt([
        {
          type: "list",
          name: "type",
          message: "Select type to generate",
          choices: [
            { name: "New Application", value: "application" },
            { name: "Upgrade Project", value: "upgrade" },
          ],
        },
      ]);

      this.options.type = response.type;
    }
  }

  async chooseDestinationDir() {
    if (!this.options.dir) {
      const response = await this.prompt([
        {
          type: "input",
          name: "dir",
          message: "Directory for project",
          default: ".",
        },
      ]);

      this.options.dir = response.dir;
    }
  }

  async checkDestinationDirIsClean() {
    if (this.options.dir) {
      this.options.destinationRoot = path.isAbsolute(this.options.dir)
        ? this.options.dir
        : path.resolve(process.cwd(), this.options.dir);
    } else {
      this.options.destinationRoot = process.cwd();
    }

    this.destinationRoot(this.options.destinationRoot);
    this.env.cwd = this.options.destinationRoot;

    if (
      this.options.type !== "upgrade" &&
      this.fs.exists(this.destinationPath("package.json"))
    ) {
      this.log(chalk.red("The destination folder already contains a package.json file."));
      process.exit(1);
    }
  }

  async executeChildGenerator() {
    switch (this.options.type) {
      case "application":
        this.composeWith(
          { Generator: Application, path: require.resolve("../application") },
          { options: this.options },
        );
        break;
      case "upgrade":
        this.composeWith(
          { Generator: Upgrade, path: require.resolve("../upgrade") },
          { options: this.options },
        );
        break;
      default:
        this.log(chalk.red(`Unsupported generator type ${this.options.type}.`));
    }
  }
}
