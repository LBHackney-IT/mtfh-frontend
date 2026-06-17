const genericNames = require("generic-names");
const path = require("path");

const generate = genericNames("[local]-[hash:base64:5]", {
  context: process.cwd(),
});

const projectRoot = path.resolve(__dirname, "..");
const sassLoadPaths = [projectRoot, path.join(projectRoot, "packages/react")];

const isScssRule = (rule) => {
  if (!rule?.test) {
    return false;
  }

  const test = rule.test.toString();
  return test.includes("scss") || test.includes("sass");
};

const removeScssRules = (rules = []) =>
  rules.filter((rule) => {
    if (rule.oneOf) {
      rule.oneOf = removeScssRules(rule.oneOf);
    }

    if (rule.rules) {
      rule.rules = removeScssRules(rule.rules);
    }

    return !isScssRule(rule);
  });

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../packages/react/src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-webpack5-compiler-babel"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      "~lbh-frontend": path.join(projectRoot, "node_modules/lbh-frontend"),
      "~govuk-frontend": path.join(projectRoot, "node_modules/govuk-frontend"),
    };

    webpackConfig.module.rules = removeScssRules(webpackConfig.module.rules);

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: sassLoadPaths,
              loadPaths: sassLoadPaths,
            },
          },
        },
      ],
    });

    webpackConfig.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              mode: "local",
              namedExport: false,
              getLocalIdent: (ctx, local, name) => {
                return name === "js-enabled" ? name : generate(name, ctx.resourcePath);
              },
              exportLocalsConvention: "camelCase",
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: sassLoadPaths,
              loadPaths: sassLoadPaths,
            },
          },
        },
      ],
    });

    return webpackConfig;
  },
};

module.exports = config;
