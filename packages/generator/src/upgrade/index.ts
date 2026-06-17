import chalk from "chalk";
import { sentenceCase } from "change-case";
import Generator from "yeoman-generator";

interface UpgradeGeneratorOptions {
  packageManager: "yarn" | "npm";
}

type PackageJson = {
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  version: string;
};

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
    const current = this.fs.readJSON(this.destinationPath("package.json")) as PackageJson;

    const all = {
      dependencies: {},
      devDependencies: {
        "@hackney/eslint-config": "latest",
        "@hackney/prettier-config": "latest",
        "@typescript-eslint/eslint-plugin": "^7.18.0",
        "@typescript-eslint/parser": "^7.18.0",
        eslint: "^8.57.1",
        "eslint-config-airbnb-typescript": "^18.0.0",
        "eslint-config-prettier": "^9.1.0",
        "eslint-plugin-import": "^2.31.0",
        "eslint-plugin-jest": "^28.9.0",
        "eslint-plugin-prettier": "^5.2.1",
        prettier: "^3.4.2",
        "pretty-quick": "^4.0.0",
        webpack: "^5.97.0",
        "webpack-cli": "^4.10.0",
        "webpack-config-single-spa-ts": "4.1.1",
        "webpack-dev-server": "^4.15.2",
        "webpack-merge": "^5.10.0",
      },
    };

    const mfe = {
      devDependencies: {
        "@hackney/mtfh-test-utils": "latest",
        "@hackney/webpack-import-map-plugin": "latest",
        "@testing-library/jest-dom": "^6.6.3",
        "@testing-library/react": "^16.1.0",
        "@types/jest": "^29.5.14",
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@types/react-router-dom": "5.1.9",
        "babel-jest": "^29.7.0",
        "eslint-config-airbnb": "^19.0.4",
        "eslint-config-react": "1.1.7",
        "eslint-plugin-jsx-a11y": "^6.10.2",
        "eslint-plugin-react": "^7.37.2",
        "eslint-plugin-react-hooks": "^5.0.0",
        "eslint-plugin-testing-library": "^6.4.0",
        jest: "^29.7.0",
        "jest-environment-jsdom": "^29.7.0",
        msw: "^2.6.0",
        "ts-config-single-spa": "3.0.0",
        undici: "^6.21.0",
        "webpack-config-single-spa-react": "4.0.2",
        "webpack-config-single-spa-react-ts": "4.0.2",
      },
      dependencies: {
        "lbh-frontend": "latest",
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "react-router-dom": "^5.2.0",
        "single-spa-react": "^5.1.4",
        swr: "1.0.1",
      },
    };

    const conditional = {
      dependencies: {
        formik: "^2.4.6",
        yup: "0.32.9",
      },
    };

    const isReact = Object.keys(current?.dependencies || []).includes("react");

    const mapToUpdateArray = (deps: Record<string, string>, optional: boolean) =>
      Object.entries(deps).map(([library, version]) => ({
        library,
        version: version === "latest" ? `^${getLatestVersion(library)}` : version,
        optional,
      }));

    const packageDeps: DependencyUpdate = {
      dependencies: [
        ...mapToUpdateArray(conditional.dependencies, true),
        ...mapToUpdateArray(isReact ? mfe.dependencies : all.dependencies, false),
      ],
      devDependencies: mapToUpdateArray(
        isReact
          ? { ...all.devDependencies, ...mfe.devDependencies }
          : all.devDependencies,
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
        const list = current[`${type}`];
        if (list && list[`${library}`]) {
          const libVersion = list[`${library}`];
          if (version !== libVersion) {
            packages[`${type}`] = { ...packages[`${type}`], [library]: version };
            this.log(`${chalk.yellow("Updating")} ${library}@${version}`);
          }
        } else if (!optional) {
          packages[`${type}`] = { ...packages[`${type}`], [library]: version };
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
