const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config before returning it.
  config.performance.maxEntrypointSize = 5000000;
  config.performance.maxAssetSize = 5000000;
  return config;
};
