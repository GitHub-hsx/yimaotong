# 翼知讯h5 必读文档

## 框架搭建

### 路由按需加载
### reducer 按需加载
### redux-saga 按需加载 [redux-saga](./docs/redux-saga文档.md)
### rem布局
### 支持mock数据
### 热更新
### 增加jest测试
### 支持webpack dll模式加快编译
## 目录结构

```
.
├── build/                    # 打包构建目录
│   ├── mock/                   # 假数据目录
│   ├── server/                 # 开发环境本地服务器配置目录
│   ├── test/                   # jest配置目录
│   ├── dll.config.js           # webpack dll配置
│   ├── webpack.base.conf.js    # webpack基础配置文件
│   ├── webpack.dev.conf.js     # webpack开发环境配置文件 dev
│   ├── webpack.dll.conf.js     # webpack开发环境配置文件 dll配置
│   └── webpack.prod.conf.js    # webpack生产环境配置文件 prod
├── config/                   # 公共配置目录
│   ├── dev.js                  # 开发环境配置     dev
│   ├── prod.js                 # 生产环境配置文件 prod
│   ├── sit.js                  # sit环境配置
│   └── uat.js                  # uat环境下配置
├── docs/                     # 项目文档目录
├── dist/                     # 输出目录,打包之后包含所有正式环境所需的js css html
├── public/                   # 公共资源目录
├── src                       # 源码目录
│   ├── assets/                 # 静态资源目录 如font image
│   ├── components/             # 公共组件目录
│   ├── constants/              # 静态变量目录 如api接口配置
│   ├── containers/             # 容器组件目录
│   ├── pages/                  # 页面目录
│   ├── routes/                 # 路由配置目录
│   ├── store/                  # redux store 目录
│   ├── utils/                  # 公共方法目录
│   ├── global.css              # 全局css主要为去除浏览器内置基础样式
│   ├── global.less             # 全局less 将样式配置作为静态量存储位置
│   ├── globalActions.js        # 全局action
│   ├── globalReducer.js        # 全局reducer
│   ├── index.js                # 主入口
│   ├── reducers.js             # reducer配置方法
│   └── Routers/                # 路由配置文件
├── .babelrc                  # babel 配置文件 
├── .editorconfig             # 配置编辑器
├── .eslintignore             # eslint 忽略文件
├── .eslint                   # eslint 配置文件
├── .gitignore                # 配置忽略文件
├── package-lock.json         # npm 安装包锁定文件 
├── package.json              # 项目配置
├── README.md                 # 项目说明
└── yarn.lock                 # yarn 安装包锁定文件 

```
## 第三方库(较大)

- 组件 ant-mobile [ant-mobile](https://mobile.ant.design/docs/react/introduce-cn)
- 图表 antV [f2](https://antv.alipay.com/zh-cn/index.html)


## 使用方式
具体方式请看 package.json 的scripts命令

### 启动阶段 安装依赖包(请先安装node环境)
```
npm install 
```

### 开发环境启动
- 常规模式下开发 启动以下命令 访问localhost:9000(默认端口)
```
npm run start
```
- dll 加快编译模式下开发
```
npm run build:DLL
```
npm run build:DLL这个命令用于将第三方包预先打包，在第三方包未变更的情况下只需要使用一次   

启动
```
npm run start:dll
```
### 生产环境下build
- sit环境包
```
npm run build:SIT
```
- uat环境包
```
npm run build:UAT
```
- 正式包
```
npm run build
```
输出目录 dist

### jest测试(扩展)
前端自动化测试(jest实现),任务量较大，目前未强制要求
```
npm run test
```

## [版本日志](./docs/version.md)

