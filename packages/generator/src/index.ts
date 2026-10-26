import path from "path";

import chalk from "chalk";
import Generator from "yeoman-generator";

import packageJson from "../package.json";
import Application from "./application";
import Upgrade from "./upgrade";

type YeomanOptions = NonNullable<ConstructorParameters<typeof Generator>[1]>;

interface HackneyGeneratorOptions {
  dir: string;
  type: "application" | "upgrade";
  destinationRoot: string;
}

export default class HackneyGenerator extends Generator {
  private get opts(): HackneyGeneratorOptions {
    return this.options as unknown as HackneyGeneratorOptions;
  }

  constructor(args: string | string[], options: YeomanOptions) {
    super(Array.isArray(args) ? args : [args], options);

    this.option("dir", { type: String });
    this.option("type", { type: String });

    if (args.length > 0 && !this.opts.dir) {
      this.opts.dir = args[0];
    }
  }

  public initializing() {
    this.log(`${chalk.bgGreen.black(` ${packageJson.name} `)} ${packageJson.version}`);

    try {
      const { stdout } = this.spawnSync(
        "npm",
        ["view", "@hackney/generator-mfe@latest", "version"],
        { stdio: "pipe" },
      );

      const remoteVersion = String(stdout).trim();

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
    if (!this.opts.type) {
      const response = await this.prompt([
        {
          type: "select",
          name: "type",
          message: "Select type to generate",
          choices: [
            { name: "New Application", value: "application" },
            { name: "Upgrade Project", value: "upgrade" },
          ],
        },
      ]);

      this.opts.type = response.type;
    }
  }

  async chooseDestinationDir() {
    if (!this.opts.dir) {
      const response = await this.prompt([
        {
          type: "input",
          name: "dir",
          message: "Directory for project",
          default: ".",
        },
      ]);

      this.opts.dir = response.dir;
    }
  }

  async checkDestinationDirIsClean() {
    if (this.opts.dir) {
      this.opts.destinationRoot = path.isAbsolute(this.opts.dir)
        ? this.opts.dir
        : path.resolve(process.cwd(), this.opts.dir);
    } else {
      this.opts.destinationRoot = process.cwd();
    }

    this.destinationRoot(this.opts.destinationRoot);
    this.env.cwd = this.opts.destinationRoot;

    if (
      this.opts.type !== "upgrade" &&
      this.fs.exists(this.destinationPath("package.json"))
    ) {
      this.log(chalk.red("The destination folder already contains a package.json file."));
      process.exit(1);
    }
  }

  async executeChildGenerator() {
    switch (this.opts.type) {
      case "application":
        this.composeWith(
          { Generator: Application, path: require.resolve("../application") },
          this.options,
        );
        break;
      case "upgrade":
        this.composeWith(
          { Generator: Upgrade, path: require.resolve("../upgrade") },
          this.options,
        );
        break;
      default:
        this.log(chalk.red(`Unsupported generator type ${this.opts.type}.`));
    }
  }
}
