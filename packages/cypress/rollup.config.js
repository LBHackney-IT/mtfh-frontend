import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: { index: "src/index.ts", plugin: "src/plugin.ts" },
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
    external: ["@testing-library/cypress"],
    plugins: [
      peerDepsExternal({ includeDependencies: true }),
      resolve({ preferBuiltins: true }),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        include: ["**/*.ts", "**/*.tsx"],
        exclude: ["**/*.test.ts", "**/*.test.tsx"],
      }),
      commonjs(),
    ],
  },
];
