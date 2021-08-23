const genericNames = require("generic-names")

const generate = genericNames("[local]-[hash:base64:5]", {
  context: process.cwd(),
})

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../packages/react/src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
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
    })

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
              // localIdentName: "[local]",
              getLocalIdent: (ctx, local, name) => {
                return name === "js-enabled"
                  ? name
                  : generate(name, ctx.resourcePath)
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
    })

    return config
  },
}
