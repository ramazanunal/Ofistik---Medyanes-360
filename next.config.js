const nextConfig = {
  future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    console.log(options.webpack.version);
    config.experiments = {};
    // Add options to webpack config
    config.output.publicPath = "/";
    return config;
  },
  output: "standalone",
};

module.exports = nextConfig;
