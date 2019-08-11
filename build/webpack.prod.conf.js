
/**
 * prod环境 webpack 配置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

// 根据 打包命令确定 sit uat prod 环境
const env = process.env.env_config?require('../config/'+process.env.env_config):require('../config/prod');

module.exports = require('./webpack.base.conf')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'src/index.js')],
  // devtool: 'source-map',
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    publicPath: env.publicPath,
  },
  //代码压缩
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
       new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
              discardComments: {removeAll: true},
              // 避免 cssnano 重新计算 z-index
              safe: true
          },
          canPrint: false
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ManifestPlugin({
      fileName: 'source-router.json',
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
      chunkFilename: "css/[id].[chunkhash].css"
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new CopyWebpackPlugin([
      { 
        context: './public/',
        from: '**/**', 
        to: '',
        ignore: ['*.html'] 
      }
    ],{
      debug: 'info',
      copyUnmodified: true
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
})
