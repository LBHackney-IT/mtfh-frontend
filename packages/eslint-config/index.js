module.exports = {
  root: true,
  extends: ["plugin:import/recommended"],
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 10,
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: [".mjs"],
        project: ["./tsconfig.json"],
      },
      plugins: [
        "@typescript-eslint/eslint-plugin",
        "react",
        "react-hooks",
        "testing-library",
      ],
      extends: [
        "airbnb-typescript",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/no-shadow": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
        "react/jsx-props-no-spreading": "off",
        "react/no-array-index-key": "off",
        "react/require-default-props": "off",
        "react/sort-prop-types": "error",
        "react/prop-types": "off",
        "react-hooks/exhaustive-deps": "error",
        "react/forbid-prop-types": "off",
        "react/no-danger": "off",
        "react/button-has-type": "off",
        "react/no-unescaped-entities": "off",
        "react/state-in-constructor": "off",
        "react/destructuring-assignment": "off",
        "jsx-a11y/no-autofocus": "off",
        "jsx-a11y/anchor-is-valid": [
          "error",
          {
            components: ["Link"],
            aspects: ["invalidHref"],
          },
        ],
        "jsx-a11y/label-has-associated-control": "off",
      },
    },
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react", "prettier"],
    },
    {
      files: ["*"],
      extends: ["plugin:prettier/recommended"],
      rules: {
        "no-param-reassign": "off",
        "no-console": "off",
        "no-underscore-dangle": "off",
        "no-shadow": "off",
        "no-plusplus": "off",
        "spaced-comment": "off",
        "guard-for-in": "off",
        "operator-assignment": "off",
        "prefer-destructuring": "off",
        "react/no-children-prop": "off",
        "consistent-return": "off",
        "no-restricted-syntax": "off",
        "no-continue": "off",
        "no-bitwise": "off",
        "no-redeclare": "off",
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "**/*.+(test|spec).+(j|t)s?(x)",
              "test?(s)/**/*.+(j|t)s?(x)",
              "**/*.config.?(m)js",
              "test-utils.ts?(x)",
            ],
          },
        ],
        "import/order": [
          "error",
          {
            groups: ["builtin", "external", ["sibling", "parent"], "index", "type"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
            pathGroups: [
              {
                pattern: "react*(-*)",
                group: "external",
                position: "before",
              },
              {
                pattern: "@mtfh/**",
                group: "internal",
                position: "before",
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
        "no-alert": "off",

        "import/no-named-as-default": "off",
        "prefer-object-spread": "off",
        "arrow-body-style": "off",
      },
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
