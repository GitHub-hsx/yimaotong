/**
 * dev环境 webpack 配置
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const logger = require('./server/logger');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const env = require('../config/dev');
const { dllPlugin } = require('./dll.config');


const plugins = [
  new webpack.DefinePlugin({
    'process.env': env
  }),
  new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
  new HtmlWebpackPlugin({
    inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
    template: 'public/index.html',
  }),
]

if (dllPlugin) {
  glob.sync(`${dllPlugin.defaults.path}/*.dll.js`).forEach(dllPath => {
    plugins.push(
      new AddAssetHtmlPlugin({
        filepath: dllPath,
        includeSourcemap: false,
      }),
    );
  });
}

module.exports = require('./webpack.base.conf')({
  mode:'development',
  // 测试环境热更新
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src/index.js'), // 主入口
  ],
  // 测试环境不使用 hash后缀
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: env.publicPath,
  },
  //代码压缩
  optimization: {
    minimize: false,
  },
  // 测试环境插件
  // dependencyHandlers().concat(plugins)
  plugins: dependencyHandlers().concat(plugins), // eslint-disable-line no-use-before-define
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
});

function dependencyHandlers() {
  if(!process.env.DLL){
    return []
  }

    // If the package.json does not have a dllPlugin property, use the CommonsChunkPlugin
  if (!dllPlugin) {
    return [];
  }

  const dllPath = path.resolve(
    process.cwd(),
    dllPlugin.defaults.path || 'dlls',
  );
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'projectDeps.json');
    if (!fs.existsSync(manifestPath)) {
      logger.error(
        'The DLL manifest is missing. Please run `npm run build:dll`',
      );
      process.exit(0);
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        // manifest: require(manifestPath), // eslint-disable-line global-require
        manifest: require('../dlls/projectDeps.json'), // eslint-disable-line global-require
      }),
    ];
  }
}