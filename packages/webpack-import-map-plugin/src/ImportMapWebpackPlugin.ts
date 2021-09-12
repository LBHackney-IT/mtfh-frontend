import { URL } from "url";
import { Compilation, Compiler } from "webpack";

export interface ImportMapWebpackPluginOptions {
  namespace: string;
  basePath: string;
  outputFilename?: string;
}

export default class ImportMapWebpackPlugin {
  options: ImportMapWebpackPluginOptions = {
    namespace: "",
    basePath: "/",
    outputFilename: "import-map",
  };
  name = "ImportMapWebpackPlugin";

  constructor({
    namespace,
    basePath,
    outputFilename = "import-map",
  }: ImportMapWebpackPluginOptions) {
    if (!namespace || typeof namespace !== "string") {
      throw new Error(`[${this.name}] namespace must be a valid string.`);
    }

    if (!namespace.includes("@")) {
      throw new Error(`[${this.name}] namespace must be prefixed with "@".`);
    }

    if (typeof outputFilename === "string" && !outputFilename) {
      throw new Error(`[${this.name}] outputFilename cannot be blank.`);
    }

    try {
      // eslint-disable-next-line no-new
      new URL(basePath);
    } catch (e) {
      throw new Error(`[${this.name}] basePath is not a valid domain.`);
    }
    this.options = {
      namespace,
      basePath,
      outputFilename,
    };
  }

  apply(compiler: Compiler) {
    const { RawSource } = compiler.webpack.sources;
    compiler.hooks.thisCompilation.tap(this.name, (compilation) => {
      const logger = compilation.getLogger(this.name);
      compilation.hooks.processAssets.tap(
        {
          name: this.name,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const files = Object.keys(assets);
          const collection = files.reduce((accum, file) => {
            if (file.endsWith(".js")) {
              const name = file.split(".")[0];
              const project = `${this.options.namespace}/${name}`;
              if (project) {
                accum[project] = new URL(file, this.options.basePath).href;
              }
            }
            return accum;
          }, {});
          if (Object.keys(collection).length > 0) {
            const map = JSON.stringify({
              imports: collection,
            });

            compilation.emitAsset(
              `${this.options.outputFilename}.json`,
              new RawSource(map),
            );
          } else {
            logger.info("No assets found with mapped namespace.");
          }
        },
      );
    });
  }
}

module.exports = ImportMapWebpackPlugin;
