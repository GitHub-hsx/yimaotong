# 本项目使用react-router v4版本
详细文档请自行阅读官方文档  
官方地址： [reacttraining](https://reacttraining.com/react-router/web/guid)  
github地址：[github](https://github.com/ReactTraining/react-router)

## 基本用法
### Link跳转
Link标签是 react-router 中对于a标签的封装，以达到a标签跳转的效果  

```js

class App extends Component {
  render(){
    return(
      <div>
        <Link to="/path">a标签跳转</Link>
      </div>
    )
  }
}
```
### 方法跳转
本项目中将 createBrowserHistory 的history 注入到组件 props中，所以可以直接采用 this.props.history的方法进行路由变化。  

```js

class App extends Component {
  jump = ()=>{
    this.props.history.push("/path")
  }
  render(){
    return(
      <div>
       <button type="button" onClick={this.jumpTo}></button>
      </div>
    )
  }
}
```

其他属性 列举几个常用的 具体请看 [history](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md)  
- this.props.history.push() 路由内跳转
- this.props.history.go(n) 路由跳转 根据整数n 确定 比如 go(-1)就是回退一个路由 go(1)就是向前一个路由
- this.props.history.goBack() 返回 相当于go(-1)
- this.props.history.replace() 路由替换