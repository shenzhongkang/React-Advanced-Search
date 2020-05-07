const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../src'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.min\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]-[local]-[hash:base64:5]'
              },
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    compress: true,
    host: '127.0.0.1',
    port: 3030
  },
  devtool: 'cheap-module-source-map'
};

module.exports = merge(devConfig, baseConfig);
