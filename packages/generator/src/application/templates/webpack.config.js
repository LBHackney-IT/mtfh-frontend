const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const webpack = require('webpack');
const {
  ImportMapWebpackPlugin,
} = require('@hackney/webpack-import-map-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: '<%= orgName %>',
    projectName: '<%= projectName %>',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      <%= projectName %>: defaultConfig.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    externals: ['react-router-dom', 'formik', 'yup'],
    plugins: [
      new ImportMapWebpackPlugin({
        namespace: '@<%= orgName %>',
        basePath: process.env.APP_CDN || 'http://localhost:<%= port %>',
      }),
    ],
  });
};
