import chalk from "chalk";
import { sentenceCase } from "change-case";
import Generator from "yeoman-generator";

interface UpgradeGeneratorOptions {
  packageManager: "yarn" | "npm";
}

type Dependency = { library: string; version: string; optional: boolean };

type DependencyUpdate = Record<"dependencies" | "devDependencies", Dependency[]>;

export default class ApplicationGenerator extends Generator<UpgradeGeneratorOptions> {
  constructor(args: string | string[], options: UpgradeGeneratorOptions) {
    super(args, options);

    this.option("packageManager", { type: String });
  }

  public initializing() {
    this.log("Update micro-frontend dependencies ⚡️");

    if (!this.fs.exists(this.destinationPath("package.json"))) {
      this.log(chalk.red("There is no package.json in the current working directory"));
      process.exit(1);
    }
  }

  async packageManger() {
    this.options.packageManager = this.fs.exists(this.destinationPath("yarn.lock"))
      ? "yarn"
      : "npm";

    if (this.options.packageManager === "yarn") {
      this.log("yarn.lock detected, installing dependencies with yarn.");
    } else {
      this.log("Defaulting to use npm.");
    }

    this.env.options.nodePackageManager = this.options.packageManager;
  }

  async checkDependencies() {
    const getLatestVersion = (packageName: string) => {
      const { stdout } = this.spawnCommandSync(
        "npm",
        ["view", `${packageName}@latest`, "version"],
        { stdio: "pipe" },
      );
      return stdout;
    };
    const current = this.fs.readJSON(this.destinationPath("package.json")) as Record<
      string,
      any
    >;

    const all = {
      dependencies: {},
      devDependencies: {
        "@hackney/eslint-config": "latest",
        "@hackney/prettier-config": "latest",
        "@typescript-eslint/eslint-plugin": "^4.29.3",
        eslint: "^7.30.0",
        "eslint-config-airbnb-typescript": "^12.3.1",
        "eslint-config-prettier": "^8.3.0",
        "eslint-config-react": "^1.1.7",
        "eslint-plugin-import": "^2.24.2",
        "eslint-plugin-jsx-a11y": "^6.4.1",
        "eslint-plugin-prettier": "^3.4.0",
        prettier: "^2.3.2",
        webpack: "5.53.0",
        "webpack-cli": "4.9.0",
        "webpack-config-single-spa-ts": "4.1.1",
        "webpack-dev-server": "4.2.1",
        "webpack-merge": "5.7.3",
      },
    };

    const mfe = {
      devDependencies: {
        "@hackney/mtfh-test-utils": "latest",
        "@hackney/webpack-import-map-plugin": "latest",
        "@testing-library/jest-dom": "^5.14.1",
        "@testing-library/react": "^12.0.0",
        "@types/jest": "26.0.16",
        "@types/react": "17.0.20",
        "@types/react-dom": "17.0.9",
        "@types/react-router-dom": "5.1.9",
        "eslint-plugin-react": "^7.24.0",
        "eslint-plugin-react-hooks": "^4.2.0",
        "eslint-plugin-testing-library": "^4.9.0",
        jest: "26.6.3",
        "jest-cli": "26.6.3",
        "ts-config-single-spa": "3.0.0",
        "webpack-config-single-spa-react": "4.0.2",
        "webpack-config-single-spa-react-ts": "4.0.2",
      },
      dependencies: {
        "lbh-frontend": "^3.6.1",
        react: "17.0.2",
        "react-dom": "17.0.2",
        "react-router-dom": "5.2.0",
        "single-spa-react": "4.4.0",
      },
    };

    const conditional = {
      dependencies: {
        swr: "1.0.1",
        formik: "2.2.9",
        yup: "0.32.9",
      },
    };

    const isMFE = Object.keys(current?.dependencies).includes("react");

    const mapToUpdateArray = (deps: Record<string, string>, optional: boolean) =>
      Object.entries(deps).map(([library, version]) => ({
        library,
        version: version === "latest" ? `^${getLatestVersion(library)}` : version,
        optional,
      }));

    const packageDeps: DependencyUpdate = {
      dependencies: [
        ...mapToUpdateArray(conditional.dependencies, true),
        ...mapToUpdateArray(isMFE ? mfe.dependencies : all.dependencies, false),
      ],
      devDependencies: mapToUpdateArray(
        isMFE ? { ...all.devDependencies, ...mfe.devDependencies } : all.devDependencies,
        true,
      ),
    };

    const packages: Record<string, Record<string, string>> = {
      dependencies: {},
      devDependencies: {},
    };

    const validateSemver = (collection: Dependency[], type: string) => {
      if (Object.keys(collection).length > 0) {
        this.log("");
        this.log(`${sentenceCase(type)} Updates:`);
      }
      collection.forEach(({ library, version, optional }) => {
        if (current[type] && current[type][library]) {
          if (version !== current[type][library]) {
            packages[type] = { ...packages[type], [library]: version };
            this.log(`${chalk.yellow("Updating")} ${library}@${version}`);
          }
        } else if (!optional) {
          packages[type] = { ...packages[type], [library]: version };
          this.log(`${chalk.green("Adding")} ${library}@${version}`);
        }
      });
    };

    validateSemver(packageDeps.dependencies, "dependencies");
    validateSemver(packageDeps.devDependencies, "devDependencies");

    this.addDependencies(packages.dependencies);
    this.addDevDependencies(packages.devDependencies);
  }
}
