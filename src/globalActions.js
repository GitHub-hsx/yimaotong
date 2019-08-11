/**
 *全局action
 */
// 定义方法
export const POST_BASE_LOGIN = '/Global/login';
export const POST_BASE_LOGIN_SUCCESS = '/Global/login/success';
export const POST_BASE_LOGIN_ERROR = '/Global/login/error';

export const LISTEN_TOKEN_ACTION = '/接收token/';
export const LISTEN_FACE_ACTION = '/接收face/';
export const LISTEN_SEQ_ACTION = '/接收seq/';
export const LISTEN_SCAN_ACTION = '/接收扫码回调/';

export const LISTEN_MES_ACTION = '/接收客户端信息/';
export const LISTEN_FUNCTION = '/点击客户端导航栏按钮执行方法/';

/**
 * 登录
 */
export function login(params) {
  return {
    type: POST_BASE_LOGIN,
    params,
  };
}

/**
 * 登录成功
 */
export function loginSuccess(params) {
  return {
    type: POST_BASE_LOGIN_SUCCESS,
    params,
  };
}

/**
 * 登录失败
 */
export function loginError(params) {
  return {
    type: POST_BASE_LOGIN_ERROR,
    params,
  };
}

/**
 * 接收客户端回调 face action
 *  @param {object} params
 */

export function listenTokenAction(params) {
  return {
    type: LISTEN_TOKEN_ACTION,
    params,
  };
}

/**
 * 接收face 回调 type
 * @param {Object} params
 */
export function listenFaceAction(params) {
  return {
    type: LISTEN_FACE_ACTION,
    params,
  };
}

/**
 * 接收seq 回调 type
 * @param {Object} params
 */
export function listenSeqAction(params) {
  return {
    type: LISTEN_SEQ_ACTION,
    params,
  };
}

/**
 * 接收扫码 回调 type
 * @param {Object} params
 */
export function listenScanAction(params) {
  return {
    type: LISTEN_SCAN_ACTION,
    params,
  };
}

/**
 * 接收客户端参数 回调 type
 * @param {Object} params
 */
export function listenMesAction(params) {
  return {
    type: LISTEN_MES_ACTION,
    params,
  };
}

/**
 * 点击客户端导航栏 返回参数
 * @param {Object} params
 */
export function listenFunction(params) {
  return {
    type: LISTEN_FUNCTION,
    params,
  };
}
