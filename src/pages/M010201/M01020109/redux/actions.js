import {
  // 接口弹窗报错
  POPUP,
  // 个人信息修改
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

export function update(params) {
  return {
    type: UPDATE,
    params,
  };
}
export function updateSuccess(data) {
  return {
    type: UPDATE_SUCCESS,
    data,
  };
}
export function updateError(data) {
  return {
    type: UPDATE_ERROR,
    data,
  };
}
