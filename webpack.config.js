const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PROD_API_URL = 'https://mine-backend.herokuapp.com';
const DEV_API_URL = `http://localhost:${process.env.PORT || '8082'}`;

const isDevelopmentMode = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopmentMode ? 'development' : 'production',
  output: isDevelopmentMode
    ? {
        filename: '[name].js',
        publicPath: '/',
        devtoolModuleFilenameTemplate: ({ namespace, resourcePath }) => {
          if (resourcePath.includes('node_modules')) {
            return `webpack://${namespace}/${resourcePath}`;
          }
          const enhancedPath = resourcePath.replace(
            /\/(\w+)\/index\.js$/,
            '/$1/index.js::$1',
          );
          return `webpack://${namespace}/${enhancedPath}`;
        },
      }
    : {
        filename: '[name]-[chunkhash].js',
        publicPath: '/mine',
      },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'M - I - N - E',
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
    new webpack.DefinePlugin({
      __ROUTES_BASENAME__: '"/mine"',
      __API_HOST__: `"${isDevelopmentMode ? DEV_API_URL : PROD_API_URL}"`,
      __IS_DEV_MODE__: isDevelopmentMode,
    }),
    !isDevelopmentMode && new CopyWebpackPlugin(['src/404.html']),
  ].filter(Boolean),
  resolve: {
    alias: {
      // app commons
      core: path.resolve(__dirname, 'src/app-core/'),
      state: path.resolve(__dirname, 'src/app-state/'),
      modules: path.resolve(__dirname, 'src/app-agnostic-modules/'),
      content: path.resolve(__dirname, 'src/content/'),
      components: path.resolve(__dirname, 'src/app-components/'),
      pages: path.resolve(__dirname, 'src/pages/'),

      // standalone app parts
      blog: path.resolve(__dirname, 'src/app-components/standalone/blog/'),
      travel: path.resolve(__dirname, 'src/app-components/standalone/travel/'),
    },
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'eval',
};
