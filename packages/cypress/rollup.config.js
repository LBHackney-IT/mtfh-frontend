import commonjs from "@rollup/plugin-commonjs";
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
    plugins: [
      peerDepsExternal({ includeDependencies: true }),
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.ts"],
      }),
      commonjs(),
    ],
  },
];
