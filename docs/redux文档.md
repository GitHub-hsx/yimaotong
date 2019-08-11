# redux
官方英文文档：[redux.js.org](https://redux.js.org/)  
中文文档：[redux.org.cn](http://www.redux.org.cn)


## 本项目是通过 redux 进行数据管理
- Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源
- reducer 接收action、处理action、并更新store
- store 数据存储中心并提供方法

## 结合项目 采用 immutable 与 redux 结合的方式
### action  

```js
export const GET_API_DATA_BASE = '/HOME/GET_API_DATA_BASE';
export const GET_DATA_SUCCESS = '/HOME/GET_API_DATA_SUCCESS';
export const GET_DATA_ERROR = '/HOME/GET_API_DATA_ERROR';

export function getApiBase(params) {
  return {
    type: GET_API_DATA_BASE,
    params,
  };
}
export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  };
}

export function getDataError(data) {
  return {
    type: GET_DATA_ERROR,
    data,
  };
}

```
### reducer

```js
import { fromJS } from 'immutable';
import {
  GET_DATA_SUCCESS,
  GET_API_DATA_BASE,
  GET_DATA_ERROR,
} from './actions';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  data: '',
});

function expReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return state.set('data', action.data.message).set('id',action.data.id)
    case GET_DATA_ERROR:
      return state.set('data', action.data);
    default:
      return state;
  }
}

export default expReducer;

```
### store
强调一下<em>Redux 应用只有一个单一的 store</em>。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。

```js
import { createStore } from 'redux'
import expReducer from './reducers'
let store = createStore(expReducer)
```