/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-20 16:54:09
 * @LastEditTime: 2019-08-10 18:23:47
 * @LastEditors: Please set LastEditors
 */
/**
 * 全局 reducer 处理
 */

import { fromJS } from 'immutable';
import Cookie from 'js-cookie';

import {
  POST_BASE_LOGIN,
  POST_BASE_LOGIN_SUCCESS,
  POST_BASE_LOGIN_ERROR,
  LISTEN_TOKEN_ACTION,
  LISTEN_SEQ_ACTION,
  LISTEN_MES_ACTION,
  LISTEN_FUNCTION,
} from './globalActions';

/**
 * globalReducer 全局reducer
 */

// 全局state初始化
const globalInitialState = fromJS({
  loading: false,
  error: '',
  // 全局定义所有弹窗显示打开
  modalShow: {
    loginModal: false,
  },
  errorMessage: '',
  userData: {
    repositories: false,
  },
  loginData: {
    head: {
      deviceId: [],
      deviceType: '',
      osType: '',
      seq: '',
      sessionID: '',
      softVersion: '',
      type: '',
    },
    message: {

    },
    token: '',
  },
  phoneData: {},
  funState: {}, // 点击导航栏按钮调用H5方法
});

function globalReducer(state = globalInitialState, action) {
  switch (action.type) {
  case POST_BASE_LOGIN:
    return state
      .set('loading', true)
      .set('error', false);
  case POST_BASE_LOGIN_SUCCESS:
    return state
      .set('loading', false)
      .set('error', false);
  case POST_BASE_LOGIN_ERROR:
    return state
      .set('loading', false)
      .setIn(['modalShow', 'loginModal'], true)
      .set('errorMessage', action.params)
      .set('error', true);
  // 以下为客户端事件监听
  case LISTEN_TOKEN_ACTION:
    return state
      .set('loginData', action.params);
  case LISTEN_SEQ_ACTION:
    return state
      .setIn(['loginData', 'head', 'seq'], action.params);
  case LISTEN_MES_ACTION:
    localStorage.setItem('token', action.params.msgToken);
    localStorage.setItem('login', JSON.stringify(action.params));
    return state
      .set('phoneData', action.params);
  case LISTEN_FUNCTION:
    return state
      .set('funState', action.params);
  default:
    return state;
  }
}
export default globalReducer;
