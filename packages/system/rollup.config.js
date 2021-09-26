import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      commonjs({
        ignoreGlobal: true,
      }),
    ],
  },
];
