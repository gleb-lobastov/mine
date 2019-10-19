const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const GOOGLE_API_KEY = fs.readFileSync('.google_api_key', 'utf8').trim();
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
        publicPath: '/mine/',
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
      title: 'Глеб Лобастов',
      meta: {
        description:
          'Статистика путешествий. Разработка програмного обеспечения. Рецензии на книги. Сорок два.',
      },
      template: './src/index.html',
      favicon: './src/favicon.ico',
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin({
      __ROUTES_BASENAME__: '"/mine"',
      __API_HOST__: `"${isDevelopmentMode ? DEV_API_URL : PROD_API_URL}"`,
      __GOOGLE_MAP_API_KEY__: `"${GOOGLE_API_KEY}"`,
      __IS_DEV_MODE__: isDevelopmentMode,
    }),
    new CopyWebpackPlugin(
      [
        { from: 'src/static', to: 'static' },
        !isDevelopmentMode && 'src/404.html',
      ].filter(Boolean),
    ),
    isDevelopmentMode && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // app commons
      modules: path.resolve(__dirname, 'src/modules/'),
      core: path.resolve(__dirname, 'src/core/'),
      configuration: path.resolve(__dirname, 'src/configuration/'),

      // packages
      main: path.resolve(__dirname, 'src/packages/main/'),
      travel: path.resolve(__dirname, 'src/packages/travel/'),
      literature: path.resolve(__dirname, 'src/packages/literature/'),
      code: path.resolve(__dirname, 'src/packages/code/'),
      auth: path.resolve(__dirname, 'src/packages/auth/'),
    },
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    allowedHosts: ['mine.local'],
  },
  devtool: isDevelopmentMode ? 'eval' : 'source-map',
};
