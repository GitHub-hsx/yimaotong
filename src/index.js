/**
 * index.js
 *
 * 主入口
 */
// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import 'amfe-flexible';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from './utils/history';

// 全局引入 客户端交互包
import '~/utils/communicate';
// import '~/utils/jsBridge';

// 统一个浏览器的初始css
import 'sanitize.css/sanitize.css';
// 全局css
import './global.css';

// store 创建工厂
import configureStore from './store/store';
//
import GlobalRouter from './Router.js';
// import GlobalProvider from './containers/GlobalProvider';

// Create redux store with history
const rootInitialState = {};
const store = configureStore(rootInitialState, history);
// html渲染节点
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalRouter />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

// 初次渲染
render();
// 开发环境热更新
if (module.hot) {
  module.hot.accept(['Router'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}
