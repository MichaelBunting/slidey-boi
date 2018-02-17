const path = require('path');
const WebpackNotifier = require('webpack-notifier');
const UglifyJs = require('uglifyjs-webpack-plugin');

module.exports = (env = {}) => ({
  context: path.join(__dirname, 'src'),
  entry: [
    './SlideyBoi',
  ],
  output: {
    filename: 'slidey-boi.min.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    }],
  },
  plugins: [
    new WebpackNotifier({
      alwaysNotify: true,
    }),
    ...(env.NODE_ENV === 'production' ? [
      new UglifyJs({
        test: /.js$/,
        uglifyOptions: {
          compress: true,
          mangle: true,
        },
      }),
    ] : []),
  ],
});
