import {
  ADD_ASSOCIATE_ACCOUNT,
  ADD_ASSOCIATE_ACCOUNT_SUCCESS,
  ADD_ASSOCIATE_ACCOUNT_ERROR,
  // 接口弹窗报错
  POPUP,
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
