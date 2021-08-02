const withTM = require("next-transpile-modules")(["@mtfh/common"]);

module.exports = withTM({
  reactStrictMode: true,
});
