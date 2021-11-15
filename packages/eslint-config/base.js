module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 10,
    extraFileExtensions: [".mjs"],
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "airbnb-typescript/base",
    "./prettier.js",
  ],
  rules: {
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-use-before-define": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".mjs", ".js", ".ts"],
      },
    },
  },
};