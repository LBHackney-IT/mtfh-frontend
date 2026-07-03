import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import genericNames from "generic-names";
import { globbySync } from "globby";
import path from "node:path";
import { fileURLToPath } from "node:url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sassIncludePaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../../node_modules"),
];

const generate = genericNames("[hash:base64:5]", {
  context: process.cwd(),
});

const entryPoints = globbySync("src/**/*/index.ts");

const sassLoader = [
  "sass",
  {
    includePaths: sassIncludePaths,
    loadPaths: sassIncludePaths,
  },
];

export default [
  {
    input: entryPoints,
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        include: ["**/*.ts", "**/*.tsx"],
        exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx", "jest.setup.ts"],
      }),
      commonjs({
        exclude: "node_modules",
        ignoreGlobal: true,
      }),
      postcss({
        extract: false,
        modules: {
          localsConvention: "camelCase",
          generateScopedName: (name, file) => {
            return name === "js-enabled" ? name : generate(name, file);
          },
        },
        extensions: [".css", ".scss"],
        use: [sassLoader],
      }),
    ],
  },
  {
    input: "reset.scss",
    output: {
      file: "dist/reset.css",
      format: "es",
    },
    plugins: [
      postcss({
        extract: true,
        extensions: [".css", ".scss"],
        use: [sassLoader],
      }),
    ],
  },
];
