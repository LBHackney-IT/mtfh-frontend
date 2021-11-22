import path from "path";

import chalk from "chalk";
import { paramCase, pascalCase } from "change-case";
import Generator from "yeoman-generator";

import validate from "../validate-name";

interface ApplicationGeneratorOptions {
  packageManager: "yarn" | "npm";
  orgName: string;
  projectName: string;
  port: number;
  awsStream: string;
  dir: string;
  folder: string;
}

export default class ApplicationGenerator extends Generator<ApplicationGeneratorOptions> {
  constructor(args: string | string[], options: ApplicationGeneratorOptions) {
    super(args, options);

    this.option("nodePackageManager", { type: String });
    this.option("orgName", { type: String });
    this.option("projectName", { type: String });
    this.option("port", { type: Number });
    this.option("awsStream", { type: String });
    this.option("dir", { type: String });

    if (args.length > 0 && !this.options.dir) {
      this.options.dir = args[0];
    }
  }

  public initializing() {
    this.log("Generating React application micro-frontend ⚡️");
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
    this.options.dir = path.isAbsolute(this.options.dir)
      ? this.options.dir
      : path.resolve(process.cwd(), this.options.dir);

    this.destinationRoot(this.options.dir);
    this.env.cwd = this.options.dir;

    const dir = this.options.dir.match(/([^/]*)\/*$/);

    if (dir) {
      this.options.folder = dir[1];
    }

    if (this.options.folder && this.options.folder.indexOf("mtfh-frontend-") !== 0) {
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
    if (!this.options.packageManager) {
      const response = await this.prompt([
        {
          type: "list",
          name: "packageManager",
          message: "Which package manager do you want to use?",
          choices: ["yarn", "npm"],
          when: !this.options.packageManager,
        },
      ]);

      this.options.packageManager = response.packageManager;
    }
    this.env.options.nodePackageManager = this.options.packageManager;
  }

  async setProjectDetails() {
    const response = await this.prompt([
      {
        type: "input",
        name: "orgName",
        message: "Namespace of project (@namespace/project)",
        default: this.options.orgName || "mtfh",
        validate,
      },
      {
        type: "input",
        name: "projectName",
        message: "Name of application",
        default: this.options.projectName || "",
        validate,
      },
    ]);

    this.options = {
      ...this.options,
      ...response,
    };

    this.options.orgName = paramCase(this.options.orgName);
    this.options.projectName = paramCase(this.options.projectName);

    const confirmation = await this.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `The project will be created with the following scope @${this.options.orgName}/${this.options.projectName}, is this correct?`,
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
        when: !this.options.port,
        default: 9000,
      },
      {
        type: "input",
        name: "awsStream",
        message: "What is the aws namespace resources should be created under",
        when: !this.options.awsStream,
        default: "tl-housing",
        validate,
      },
    ]);

    this.options = {
      ...this.options,
      ...response,
    };

    this.options.awsStream = paramCase(this.options.awsStream);
  }

  async syncTemplateFiles() {
    const templateLiterals = {
      ...this.options,
      projectNamePascal: pascalCase(this.options.projectName),
      name: `@${this.options.orgName}/${this.options.projectName}`,
      main: `${this.options.orgName}-${this.options.projectName}`,
      packageManagerRun: this.options.packageManager === "npm" ? "npm run" : "yarn",
      packageManagerLock:
        this.options.packageManager === "npm" ? "package-lock.json" : "yarn.lock",
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
      {},
      {
        processDestinationPath: (path: string): string =>
          Object.keys(templateLiterals).reduce((accum, literal) => {
            return accum.replace(
              new RegExp(`\\[${literal}\\]`, "g"),
              templateLiterals[`${literal}`],
            );
          }, path),
      },
    );
  }

  async setupGit() {
    this.log(`[SYSTEM] "${this.options.folder}" ${this.options.dir}`);

    if (!this.fs.exists(this.destinationPath(".git"))) {
      const childGitInitProcess = this.spawnCommandSync("git", ["init"]);
      if (childGitInitProcess.error) {
        this.log(chalk.red("\n************"));
        this.log(chalk.red("Cannot initialise git repository"));
        this.log(chalk.red("************\n"));
      } else {
        this.log(chalk.green("\nInitialised git repository\n"));
      }
    }
  }
}
