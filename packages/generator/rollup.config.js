import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import packageJson from "./package.json";

export default {
  input: {
    main: "src/index.ts",
    application: "src/application/index.ts",
    upgrade: "src/upgrade/index.ts",
  },
  output: {
    dir: "generators",
    entryFileNames: "[name]/index.js",
    format: "cjs",
    sourcemap: true,
    exports: "default",
  },
  external: Object.keys(packageJson.dependencies),
  plugins: [
    json(),
    commonjs({
      exclude: ["node_modules/"],
    }),
    resolve({ preferBuiltins: true }),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    copy({
      targets: [
        {
          src: "src/application/templates",
          dest: "generators/application",
        },
      ],
    }),
  ],
};
