# 不可变对象 immutable

官方地址：[immutable](http://facebook.github.io/immutable-js/docs/#/)

## 为什么要用immutable
Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。   
本项目中主要用 immutable 处理redux的数据管理

## 安装immutable(项目已安装)

<code>npm install immutable</code>

## 部分api
#### 从 JavaScript 数据生成不可变对象(支持数据嵌套):
```js
Immutable.fromJS([1,2]) //List
Immutable.fromJS({a: 1}) //Map
```

#### 从不可变数据生成 JavaScript 对象
```js
immutableData.toJS()
```

### List

```js
Immutable.List() # 空 List
Immutable.List([1,2])
Immutable.fromJS([1,2])
immutableList.set(1, 2)
```
#### 查看 List 的大小:
```js
immutableA.size
immutableA.count()
```
### Map

### 查 http://facebook.github.io/immutable-js/docs/#/get

```js
immutableData.get('a') // {a:1} 得到1。

immutableData.getIn(['a', 'b']) // {a:{b:2}} 得到2。访问深层次的key

immutableData.get('a',{}) //如果a有值 未,a对应的值;如果a无值,则结果为第二个参数

```

#### 增改
```js
immutableData.set('a', 2) // {a:1} 得到1。

immutableData.setIn(['a', 'b'], 3)

immutableData.update('a',function(x){return x+1})

immutableData.updateIn(['a', 'b'],function(x){return x+1})
```

#### 删
```js
immutableData.delete('a')

immutableData.deleteIn(['a', 'b'])
```
