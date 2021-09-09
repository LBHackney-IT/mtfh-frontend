module.exports = function (api) {
  api.cache(true);

  return {
    presets: [["@babel/env"], "@babel/preset-typescript", "@babel/preset-react"],
    env: {
      cjs: {
        presets: [
          [
            "@babel/env",
            {
              modules: "commonjs",
            },
          ],
        ],
      },
      esm: {
        presets: [
          [
            "@babel/env",
            {
              modules: false,
              targets: {
                esmodules: true,
              },
            },
          ],
        ],
      },
      test: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "current node",
            },
          ],
        ],
      },
    },
  };
};
