module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: [".mjs"],
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb-typescript",
    "prettier",
  ],
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint/eslint-plugin",
    "testing-library",
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-param-reassign": "off",
    "no-console": "off",
    "jsx-a11y/no-autofocus": "off",
    "react/forbid-prop-types": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "no-shadow": "off",
    "no-plusplus": "off",
    "spaced-comment": "off",
    "guard-for-in": "off",
    "react/no-danger": "off",
    "react/button-has-type": "off",
    "react/no-unescaped-entities": "off",
    "operator-assignment": "off",
    "prefer-destructuring": "off",
    "react/no-children-prop": "off",
    "consistent-return": "off",
    "react/state-in-constructor": "off",
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/dot-notation": "off",
    "no-bitwise": "off",
    "no-redeclare": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.+(test|spec).+(j|t)s?(x)",
          "test?(s)/**/*.+(j|t)s?(x)",
          "**/*.config.?(m)js",
        ],
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "index"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "ignore",
        pathGroups: [
          {
            pattern: "react*(-dom)",
            group: "external",
            position: "before",
          },
          {
            pattern: "@mtfh/**",
            group: "index",
          },
          {
            pattern: "@*",
            group: "index",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
      },
    ],
    "@typescript-eslint/lines-between-class-members": "off",
    "no-alert": "off",
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/require-default-props": "off",
    "react/sort-prop-types": "error",
    "react/prop-types": "off",
    "@typescript-eslint/no-shadow": "off",
    "react-hooks/exhaustive-deps": "error",
    "import/no-named-as-default": "off",
    "prefer-object-spread": "off",
    "arrow-body-style": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.ts", "*.tsx", "*.mjs"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    {
      files: ["*.js", "*.mjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
