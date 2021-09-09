"use strict";

const babel = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10.0.0",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
};

module.exports = babel;
