const webpack = require('webpack');
const appConfig = require('../webpack.config');

module.exports = async ({ config }) => ({
  ...config,
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      __ROUTES_BASENAME__: '"/mine"',
      __API_HOST__: `"/api"`,
      __IS_DEV_MODE__: true,
    }),
  ],
  resolve: appConfig.resolve,
  devtool: 'eval',
});
