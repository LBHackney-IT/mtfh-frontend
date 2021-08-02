import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import genericNames from "generic-names";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

const generate = genericNames("[hash:base64:5]", {
  context: process.cwd(),
});

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    external: ["@mtfh/common"],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
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
