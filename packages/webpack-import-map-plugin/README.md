# `@hackney/webpack-import-map-plugin`

Import Map Webpack Plugin will produce an import-map of built files.

## Usage

```js
const { ImportMapWebpackPlugin } = require('@hackney/webpack-import-map-plugin');

const webpackConfig = {
    plugins: [
        entry: {
            main: './src/index.js'
        },
        output: {
            filename: '[name].[contenthash:8].js',
        },
        new ImportMapWebpackPlugin({
            basePath: process.env.CDN_URL || 'http://localhost:8000',
            mapFilenameToNamespace: (filename) => {
                if (/main\..*\.js/.test(filename)) {
                    return '@org/project';
                }
            },
            outputFilename: `import-map.${process.env.APP_ENV || "development"}`
        })
    ]
}
```

## Options

### basePath \*

Must be a valid URL domain

### mapFilenameToNamespace \*

A fuction that recieves the built asset filename. If the function returns a
string it will be included in the import-map, otherwise ignored.

### outputFilename

The name of json file to be generated. Defaults to `import-map.json`
