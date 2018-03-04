const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'M - I - N - E',
      template: './src/index.html',
    }),
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Content: path.resolve(__dirname, 'src/content/'),
    },
    extensions: ['.js', '.jsx'],
  },
};
