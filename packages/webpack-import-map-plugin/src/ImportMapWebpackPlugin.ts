import { URL } from "url"
import { Compilation, Compiler } from "webpack"

export interface ImportMapWebpackPluginOptions {
  mapFilenameToNamespace: (name: string) => string | null | undefined | void
  basePath: string
  outputFilename?: string
}

export default class ImportMapWebpackPlugin {
  options: ImportMapWebpackPluginOptions = {
    mapFilenameToNamespace: () => {},
    basePath: "/",
    outputFilename: "import-map",
  }
  name = "ImportMapWebpackPlugin"

  constructor({
    mapFilenameToNamespace,
    basePath,
    outputFilename = "import-map",
  }: ImportMapWebpackPluginOptions) {
    if (typeof mapFilenameToNamespace !== "function") {
      throw new Error(
        `[${this.name}] mapFilenameToNamespace options is required.`,
      )
    }

    if (typeof outputFilename === "string" && !outputFilename) {
      throw new Error(`[${this.name}] outputFilename cannot be blank.`)
    }

    try {
      new URL(basePath)
    } catch (e) {
      throw new Error(`[${this.name}] basePath is not a valid domain.`)
    }
    this.options = {
      mapFilenameToNamespace,
      basePath,
      outputFilename,
    }
  }

  apply(compiler: Compiler) {
    const { RawSource } = compiler.webpack.sources
    compiler.hooks.thisCompilation.tap(this.name, (compilation) => {
      const logger = compilation.getLogger(this.name)
      compilation.hooks.processAssets.tap(
        {
          name: this.name,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const files = Object.keys(assets)
          const collection = files.reduce((accum, file) => {
            const namespace = this.options.mapFilenameToNamespace(file)
            if (namespace) {
              accum[namespace] = new URL(files[0], this.options.basePath).href
            }
            return accum
          }, {})
          if (Object.keys(collection).length > 0) {
            const map = JSON.stringify({
              imports: collection,
            })

            compilation.emitAsset(
              `${this.options.outputFilename}.json`,
              new RawSource(map),
            )
          } else {
            logger.info("No assets found with mapped namespace.")
          }
        },
      )
    })
  }
}

module.exports = ImportMapWebpackPlugin
