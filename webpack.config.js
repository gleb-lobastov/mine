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
      // app commons
      core: path.resolve(__dirname, 'src/app-core/'),
      state: path.resolve(__dirname, 'src/app-state/'),
      modules: path.resolve(__dirname, 'src/app-agnostic-modules/'),
      content: path.resolve(__dirname, 'src/content/'),

      // standalone app parts
      blog: path.resolve(__dirname, 'src/app-components/standalone/blog/'),
    },
    extensions: ['.js', '.jsx'],
  },
};
