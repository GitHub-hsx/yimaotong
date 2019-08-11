const fs = require('fs');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const setupMiddlewares = require('./middlewares');


//根据获取命令行输入的端口号 默认为9000
const argv = require('minimist')(process.argv.slice(2));
const PORT = parseInt(argv.port || process.env.PORT || '9000', 10);
//获取 ip地址
const customHost = argv.host || process.env.HOST;
const HOST = customHost ||  'localhost'; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

//express服务 app初始化
const app = express();

app.set('port', PORT);

//mock api路径 设置开发假数据
const API_DIR = path.resolve('build/mock');

//将mock api 加入到server 的路由中
fs.readdirSync(API_DIR).forEach( (file) => {
  let pathname = path.join(API_DIR, file);
  let apis = require(pathname);
  for(let key in apis) {
      let route = key.split(/\s+/);
      if(route.length < 2) continue;
      let method = route[0].toLowerCase();
      let url = route[1];
      let form = route[2];
      if(form) {
          app[method](url, upload.single(form), apis[key]);
      } else {
          app[method](url, apis[key]);
      }
  }
});
//设置静态资源 页面路径
// express server setting
const EXPRESS_ROOT = __dirname;
app.use(express.static(path.resolve(process.cwd(), 'dist')));
// app.use(express.static(path.resolve(__dirname,'../../public')));
// app.use(express.static(EXPRESS_ROOT));
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// In production we need to pass these values in instead of relying on webpack
//开发服务器设置webpack编译中间件
setupMiddlewares(app, {
  outputPath: path.resolve(process.cwd(), 'dist'),
  publicPath: '/',
});

const startServer = () =>{

  // server 监听端口 默认9000
  let server = http.createServer(app);
  server.listen(app.get('port'), (err) => {
    if(err){
      return logger.error(err.message);
    }
    let host = server.address().address;
    let port = server.address().port;
    logger.appStarted(port, prettyHost);
  });
}

startServer();