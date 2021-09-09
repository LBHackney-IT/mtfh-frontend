import path from "path";
import { IFs, Volume, createFsFromVolume } from "memfs";
import webpack, { Configuration } from "webpack";
import ImportMapWebpackPlugin, {
  ImportMapWebpackPluginOptions,
} from "./ImportMapWebpackPlugin";

const generateConfig = (options: ImportMapWebpackPluginOptions): Configuration => ({
  entry: {
    main: path.join(__dirname, "..", "test", "fixtures", "index.js"),
  },
  output: {
    filename: "[name].[contenthash:8].js",
  },
  plugins: [new ImportMapWebpackPlugin(options)],
});

const compile = (config: Configuration): Promise<IFs> => {
  const fs = createFsFromVolume(new Volume());
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  return new Promise((resolve, reject) => {
    compiler.run((err) => {
      if (err) {
        reject(compiler);
      }
      resolve(fs);
    });
  });
};

test("it throws an error if basePath is not a valid domain", async () => {
  expect(() =>
    generateConfig({
      basePath: "/",
      namespace: "@mtfh",
    }),
  ).toThrow("[ImportMapWebpackPlugin] basePath is not a valid domain.");
});

test("it throws an error if outputFilename is blank", async () => {
  expect(() =>
    generateConfig({
      basePath: "http://localhost",
      namespace: "@mtfh",
      outputFilename: "",
    }),
  ).toThrow("[ImportMapWebpackPlugin] outputFilename cannot be blank.");
});

test("it throws an error if namespace is missing", async () => {
  expect(() =>
    generateConfig({
      basePath: "http://localhost",
    } as ImportMapWebpackPluginOptions),
  ).toThrow("[ImportMapWebpackPlugin] namespace must be a valid string.");
});

test("it compiles import-map with defaults", async () => {
  const config = generateConfig({
    basePath: "http://localhost",
    namespace: "@mtfh",
  });

  const fs = await compile(config);
  const map = fs.readFileSync("./dist/import-map.json", "utf8");
  expect(map).toBe('{"imports":{"@mtfh/main":"http://localhost/main.0b29e576.js"}}');
});

test("it compiles with simple webpack config", async () => {
  const fs = await compile({
    entry: path.join(__dirname, "..", "test", "fixtures", "index.js"),
    plugins: [
      new ImportMapWebpackPlugin({
        basePath: "http://localhost",
        namespace: "@mtfh",
      }),
    ],
  });
  const map = fs.readFileSync("./dist/import-map.json", "utf8");
  expect(map).toBe('{"imports":{"@mtfh/main":"http://localhost/main.js"}}');
});

test("it compiles with complex webpack config", async () => {
  const fs = await compile({
    entry: {
      add: path.join(__dirname, "..", "test", "fixtures", "index.js"),
      "math/add": path.join(__dirname, "..", "test", "fixtures", "index.js"),
    },
    plugins: [
      new ImportMapWebpackPlugin({
        basePath: "http://localhost",
        namespace: "@mtfh",
      }),
    ],
  });
  const map = fs.readFileSync("./dist/import-map.json", "utf8");
  expect(map).toBe(
    '{"imports":{"@mtfh/add":"http://localhost/add.js","@mtfh/math/add":"http://localhost/math/add.js"}}',
  );
});
