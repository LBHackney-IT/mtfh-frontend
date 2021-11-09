# `@hackney/webpack-import-map-plugin`

Import Map Webpack Plugin will produce an import-map of built files.

## Usage

```js
const { ImportMapWebpackPlugin } = require("@hackney/webpack-import-map-plugin");

const webpackConfig = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash:8].js",
  },
  plugins: [
    new ImportMapWebpackPlugin({
      basePath: process.env.CDN_URL || "http://localhost:8000",
      namespace: "@mtfh",
    }),
  ],
};
```

The above will produce an import-map with the following output:

```json
// dist/import-map.development.json
{
  "imports": {
    "@mtfh/main": "http://localhost:8000/main.74284023.js"
  }
}
```

## Options

### basePath \*

Must be a valid URL domain

### namespace \*

The namespace the outputted files belong to. e.g. `@mtfh`

### outputFilename

The name of json file to be generated. Defaults to `import-map.json`
