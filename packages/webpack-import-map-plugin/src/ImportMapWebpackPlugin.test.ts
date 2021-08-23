import ImportMapWebpackPlugin, {
  ImportMapWebpackPluginOptions,
} from "./ImportMapWebpackPlugin"
import webpack, { Configuration } from "webpack"
import path from "path"
import { createFsFromVolume, IFs, Volume } from "memfs"

const generateConfig = (
  options: ImportMapWebpackPluginOptions,
): Configuration => ({
  entry: path.join(__dirname, "..", "test", "fixtures", "index.js"),
  output: {
    filename: "[name].[contenthash:8].js",
  },
  plugins: [new ImportMapWebpackPlugin(options)],
})

const compile = (config: Configuration): Promise<IFs> => {
  const fs = createFsFromVolume(new Volume())
  const compiler = webpack(config)
  compiler.outputFileSystem = fs
  return new Promise((resolve, reject) => {
    compiler.run((err) => {
      if (err) {
        reject(compiler)
      }
      resolve(fs)
    })
  })
}

test("it throws an error if basePath is not a valid domain", async () => {
  expect(() =>
    generateConfig({
      basePath: "/",
      mapFilenameToNamespace: () => {},
    }),
  ).toThrow("[ImportMapWebpackPlugin] basePath is not a valid domain.")
})

test("it throws an error if outputFilename is blank", async () => {
  expect(() =>
    generateConfig({
      basePath: "http://localhost",
      mapFilenameToNamespace: () => {},
      outputFilename: "",
    }),
  ).toThrow("[ImportMapWebpackPlugin] outputFilename cannot be blank.")
})

test("it throws an error if mapFilenameToNamespace is missing", async () => {
  expect(() =>
    generateConfig({
      basePath: "http://localhost",
    } as ImportMapWebpackPluginOptions),
  ).toThrow(
    "[ImportMapWebpackPlugin] mapFilenameToNamespace options is required.",
  )
})

test("it compiles import-map with defaults", async () => {
  const config = generateConfig({
    basePath: "http://localhost",
    mapFilenameToNamespace: () => "@org/project",
  })

  const fs = await compile(config)
  const map = fs.readFileSync("./dist/import-map.json", "utf8")
  expect(map).toBe(
    '{"imports":{"@org/project":"http://localhost/main.0b29e576.js"}}',
  )
})

test("it wont compile the import-map when no namespaces are mapped", async () => {
  const config = generateConfig({
    basePath: "http://localhost",
    mapFilenameToNamespace: () => {},
  })

  const fs = await compile(config)
  const dir = fs.readdirSync("./dist")
  expect(dir).not.toContain("import-map.json")
})
