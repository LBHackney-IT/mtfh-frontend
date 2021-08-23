const baseConfig = require("../../jest.config")

baseConfig.setupFilesAfterEnv.push("<rootDir>/jest.setup.ts")

module.exports = {
  ...baseConfig,
}
