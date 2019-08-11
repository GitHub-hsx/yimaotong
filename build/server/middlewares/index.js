/* eslint-disable global-require */

/**
 *  中间件
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  
  if (isProd) {
    //正式环境编译
    // const addProdMiddlewares = require('./addProdMiddlewares');
    // addProdMiddlewares(app, options);
  } else {
    //开发环境中间件
    const webpackConfig = require('../../webpack.dev.conf');
    const devMiddlewaresFactory = require('./devMiddlewaresFactory');
    devMiddlewaresFactory(app, webpackConfig);
  }
  return app;
};
