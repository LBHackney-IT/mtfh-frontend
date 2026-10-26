import path from "path";

import chalk from "chalk";
import { paramCase, pascalCase } from "change-case";
import Generator from "yeoman-generator";

import validate from "../validate-name";

type YeomanOptions = NonNullable<ConstructorParameters<typeof Generator>[1]>;

interface ApplicationGeneratorOptions {
  packageManager: "yarn" | "npm";
  orgName: string;
  projectName: string;
  port: number;
  awsStream: string;
  dir: string;
  folder: string;
}

export default class ApplicationGenerator extends Generator {
  private get opts(): ApplicationGeneratorOptions {
    return this.options as unknown as ApplicationGeneratorOptions;
  }

  constructor(args: string | string[], options: YeomanOptions) {
    super(Array.isArray(args) ? args : [args], options);

    this.option("nodePackageManager", { type: String });
    this.option("orgName", { type: String });
    this.option("projectName", { type: String });
    this.option("port", { type: Number });
    this.option("awsStream", { type: String });
    this.option("dir", { type: String });

    if (args.length > 0 && !this.opts.dir) {
      this.opts.dir = args[0];
    }
  }

  public initializing() {
    this.log("Generating React application micro-frontend ⚡️");
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
    this.opts.dir = path.isAbsolute(this.opts.dir)
      ? this.opts.dir
      : path.resolve(process.cwd(), this.opts.dir);

    this.destinationRoot(this.opts.dir);
    this.env.cwd = this.opts.dir;

    const dir = this.opts.dir.match(/([^/]*)\/*$/);

    if (dir) {
      this.opts.folder = dir[1];
    }

    if (this.opts.folder && this.opts.folder.indexOf("mtfh-frontend-") !== 0) {
      this.log(
        chalk.red("The destination folder should be prefixed with `mtfh-frontend-*`."),
      );
      process.exit();
    }

    if (this.fs.exists(this.destinationPath("package.json"))) {
      this.log(chalk.red("The destination folder already contains a package.json file."));
      process.exit(1);
    }
  }

  async packageManger() {
    if (!this.opts.packageManager) {
      const response = await this.prompt([
        {
          type: "select",
          name: "packageManager",
          message: "Which package manager do you want to use?",
          choices: ["yarn", "npm"],
          when: !this.opts.packageManager,
        },
      ]);

      this.opts.packageManager = response.packageManager;
    }
    (
      this.env as typeof this.env & { options: { nodePackageManager?: string } }
    ).options.nodePackageManager = this.opts.packageManager;
  }

  async setProjectDetails() {
    const response = await this.prompt([
      {
        type: "input",
        name: "orgName",
        message: "Namespace of project (@namespace/project)",
        default: this.opts.orgName || "mtfh",
        validate,
      },
      {
        type: "input",
        name: "projectName",
        message: "Name of application",
        default: this.opts.projectName || "",
        validate,
      },
    ]);

    this.opts.orgName = paramCase(response.orgName);
    this.opts.projectName = paramCase(response.projectName);

    const confirmation = await this.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `The project will be created with the following scope @${this.opts.orgName}/${this.opts.projectName}, is this correct?`,
      },
    ]);

    if (!confirmation.confirm) {
      await this.setProjectDetails();
    }
  }

  async setAppDetails() {
    const response = await this.prompt([
      {
        type: "input",
        name: "port",
        message: "Port application should be served from (locally)",
        when: !this.opts.port,
        default: "9000",
      },
      {
        type: "input",
        name: "awsStream",
        message: "What is the aws namespace resources should be created under",
        when: !this.opts.awsStream,
        default: "tl-housing",
        validate,
      },
    ]);

    if (response.port) {
      this.opts.port = Number(response.port);
    }

    if (response.awsStream) {
      this.opts.awsStream = paramCase(response.awsStream);
    }
  }

  async syncTemplateFiles() {
    const templateLiterals = {
      ...this.options,
      projectNamePascal: pascalCase(this.opts.projectName),
      name: `@${this.opts.orgName}/${this.opts.projectName}`,
      main: `${this.opts.orgName}-${this.opts.projectName}`,
      packageManagerRun: this.opts.packageManager === "npm" ? "npm run" : "yarn",
      packageManagerLock:
        this.opts.packageManager === "npm" ? "package-lock.json" : "yarn.lock",
    };

    this.fs.copyTpl(
      [
        this.templatePath(".husky"),
        this.templatePath(".circleci"),
        this.templatePath(".*"),
        this.templatePath("*"),
        this.templatePath("**/*"),
      ],
      this.destinationPath(),
      templateLiterals,
    );
  }

  async setupGit() {
    this.log(`[SYSTEM] "${this.opts.folder}" ${this.opts.dir}`);

    if (!this.fs.exists(this.destinationPath(".git"))) {
      try {
        this.spawnSync("git", ["init"]);
        this.log(chalk.green("\nInitialised git repository\n"));
      } catch (e) {
        this.log(chalk.red("\n************"));
        this.log(chalk.red("Cannot initialise git repository"));
        this.log(chalk.red("************\n"));
      }
    }
  }
}
