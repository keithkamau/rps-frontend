const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Change the template path
      const htmlPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === "HtmlWebpackPlugin",
      );
      if (htmlPlugin) {
        htmlPlugin.options.template = "./src/index.html";
      }
      return webpackConfig;
    },
  },
};
