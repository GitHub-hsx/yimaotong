# 环境变量设置

## 配置config目录
- 开发环境 dev.js
- 内部测试环境 sit.js
- 用户测试环境 uat.js
- 生产(正式)环境 prod.js

## 配置说明

- 基础配置是prod.js,其他环境基于prod环境进行覆盖合并
### 如下为 prod环境设置
```js
module.exports = {
  NODE_ENV: '"production"',             // 打包配置 development production
  ENV_CONFIG: '"prod"',                 // 环境配置
  BASE_API: '"https://api-prod"',       //接口路径
  publicPath: "/",                 // 公共资源路径
}
```
### 示例：如果要改sit环境

```js
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',             // 打包配置 development production
  ENV_CONFIG: '"sit"',
  BASE_API: '"https://api-sit"',
   publicPath: "/",                 // 公共资源路径
})
```

## 环境设置与打包命令相关
需要查看package.json 中的打包相关命令 如下为sit环境打包 其中 env_config 默认为prod环境

```js
"cross-env NODE_ENV=production --env_config=sit webpack --config ./build/webpack.prod.conf --color -p --progress --hide-modules --display-optimization-bailout"
```