module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "./base",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "./prettier",
  ],
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "testing-library",
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
  overrides: [
    {
      files: ["**/__tests__/**/*.tsx", "**/?(*.)+(spec|test).tsx"],
      extends: ["plugin:testing-library/react", "./prettier"],
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
