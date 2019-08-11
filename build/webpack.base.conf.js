/**
 * webpack 基础包
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const devMode = process.env.NODE_ENV !== 'production'

// 获取根目录
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        //处理 less
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options:{
              modules:true,
              importLoaders:1,
              localIdentName:'[name]__[local]-[hash:base64:5]',
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')({
                    'browsers': ['> 1%', 'last 2 versions']
                  }),
                  require("postcss-pxtorem")({
                    rootValue: 75,
                    propList: [
                      '*',
                      'font', 
                      'font-size', 
                      '!line-height', 
                      '!letter-spacing',
                      '!box-shadow'
                    ],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0
                  })
                ],
            }
          },
        ],
      },
      {
        // 处理的项目包含的 .css
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')({
                    'browsers': ['> 1%', 'last 2 versions']
                  })
                ],
            }
          },
        ],
      },
      {
        //预处理位于第三库中的 .css
        test: /\.css$/,
        include: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')({
                    'browsers': ['> 1%', 'last 2 versions']
                  }),
                  require("postcss-pxtorem")({
                    rootValue: 37.5,
                    propWhiteList: [],
                  })
                ],
            }
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
        // options: {
        //   // 输出目录为 css 目录
        //   outputPath: 'css/',
        // },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                // enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                enabled: true,
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //     loader: 'file-loader',
      //     options: {
      //         // 输出目录为 css 目录
      //         outputPath: 'css/',
      //     },
      // },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new CleanWebpackPlugin(['dist'],{
      root: process.cwd()
    }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [
          pxtorem({
            rootValue: 100,
            propWhiteList: [],
          })
        ]
      }
    })
  ]),
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      '~': resolve('src'),
      // Fixes warning in moment-with-locales.min.js 
      // Module not found: Error: Can't resolve './locale' in ...
      moment$: 'moment/moment.js',
    }
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
