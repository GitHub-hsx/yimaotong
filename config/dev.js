/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-20 16:54:09
 * @LastEditTime: 2019-08-11 21:51:02
 * @LastEditors: Please set LastEditors
 */
/**
 * 开发环境配置
 * @version 1.0
 */
const merge = require('webpack-merge')
const prodEnv = require('./prod')

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"http://localhost:8001"',
  // BASE_API: '"http://192.168.1.6:8001"',
  BASE_API: '"http://192.168.1.128:8001"',
  // 反向代理
  devServer: {
    proxy: {
      '/article-gate': {
      target: 'http://s.lng168.com',
      changeOrigin: true,
      secure:false,
      pathRewrite: { '^/article-gate': '/article-gate' },
      },
      '/member-gate': {
        target: 'http://s.lng168.com',
        changeOrigin: true,
        secure:false,
        pathRewrite: { '^/member-gate': '/member-gate' },
      }
    }
  },
}
