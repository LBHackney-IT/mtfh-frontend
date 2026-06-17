const genericNames = require("generic-names");

const generate = genericNames("[local]-[hash:base64:5]", {
  context: process.cwd(),
});

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../packages/react/src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
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
              includePaths: ["packages/react"],
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
              includePaths: ["packages/react"],
            },
          },
        },
      ],
    });

    return webpackConfig;
  },
};

module.exports = config;
