const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../src/app.js'),
  output: {
    path: path.join(__dirname, '../lib/'),
    filename: 'index.js',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
};

module.exports = merge(prodConfig, baseConfig);
