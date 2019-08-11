/**
 * webpack dll generator
 * 
 */
const { join } = require('path');
const webpack = require('webpack');
const pkg = require(join(process.cwd(), 'package.json'));
const { dllPlugin } = require('./dll.config');

const outputPath = dllPlugin.defaults.path;

module.exports = require('./webpack.base.conf')({
  mode:'development',
  context: process.cwd(),
  entry:dllPlugin.entry(pkg),
  optimization: {
    minimize: false,
  },
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: join(process.cwd(), 'dlls'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
  ],
  performance: {
    hints: false,
  },
})