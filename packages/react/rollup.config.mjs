import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import genericNames from "generic-names";
import { globbySync } from "globby";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const generate = genericNames("[hash:base64:5]", {
  context: process.cwd(),
});

const entryPoints = globbySync("src/**/*/index.ts");

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
        exclude: ["**/*.test.ts?x", "**/*.stories.tsx", "jest.setup.ts"],
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
        use: ["sass"],
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
        use: ["sass"],
      }),
    ],
  },
];
