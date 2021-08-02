const path = require("path");

module.exports = {
  stories: ["../packages/react/src/components/**/*.stories.tsx"],
  addons: [
    // {
    //   name: "@storybook/preset-scss",
    //   options: {
    //     test: /\.module\.s?css$/,
    //     cssLoaderOptions: {
    //       importLoaders: 1,
    //       modules: {
    //         mode: "local",
    //         localIdentName: "[local]",
    //         exportLocalsConvention: "camelCase",
    //       },
    //     },
    //     sassLoaderOptions: {
    //       sassOptions: {
    //         includePaths: ["packages/react"],
    //       },
    //       // additionalData: "@import '../../base';",
    //     },
    //   },
    // },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
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

    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              mode: "local",
              localIdentName: "[local]",
            },
            localsConvention: "camelCase",
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

    return config;
  },
};
