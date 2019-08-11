import {
  ADD_ASSOCIATE_ACCOUNT,
  ADD_ASSOCIATE_ACCOUNT_SUCCESS,
  ADD_ASSOCIATE_ACCOUNT_ERROR,
  // 接口弹窗报错
  POPUP,
  // 实时消息详情
  REAL_TIME_MESSAGE,
  REAL_TIME_MESSAGE_SUCCESS,
  REAL_TIME_MESSAGE_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

export function addAssociateAccount(params) {
  return {
    type: ADD_ASSOCIATE_ACCOUNT,
    params,
  };
}
export function addAssociateAccountSuccess(data) {
  return {
    type: ADD_ASSOCIATE_ACCOUNT_SUCCESS,
    data,
  };
}
export function addAssociateAccountError(data) {
  return {
    type: ADD_ASSOCIATE_ACCOUNT_ERROR,
    data,
  };
}
// 实时消息详情
export function realTimeMessage(params) {
  return {
    type: REAL_TIME_MESSAGE,
    params,
  };
}
export function realTimeMessageSuccess(data) {
  return {
    type: REAL_TIME_MESSAGE_SUCCESS,
    data,
  };
}
export function realTimeMessageError(data) {
  return {
    type: REAL_TIME_MESSAGE_ERROR,
    data,
  };
}
