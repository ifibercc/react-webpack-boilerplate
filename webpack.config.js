const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    port: 8888,
    proxy: {
      '/api': 'http://122.114.38.213',
      '/mock': 'http://localhost:8888',
    },
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin()
    ],
};
