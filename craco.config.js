export default {
  webpack: {
    configure: (webpackConfig) => {
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
