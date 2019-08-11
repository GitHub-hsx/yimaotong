/**
 * @dev 开发环境 webpack中间件
 */
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const env = require('../../../config/dev');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    logLevel: 'info',
    publicPath,
    stats: {
      colors: true,
    },
  });
}

//dev 服务器增加 webpack 编译中间件 工厂
module.exports = function devMiddlewaresFactory(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler,{
    log: console.log
  }));

  const devConfig = env.devServer;
  // console.log(devConfig)
  // Set up the proxy.
  if(devConfig.proxy) {
    Object.keys(devConfig.proxy).forEach(function(context) {
      app.use(proxyMiddleware(context, devConfig.proxy[context]));
    });
  }
  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*.js', (req, res, next) => {
    next()
  });

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

};
