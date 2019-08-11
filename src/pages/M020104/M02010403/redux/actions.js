import {
  // 接口弹窗报错
  POPUP,
  // 订单评价
  EVALUATE,
  EVALUATE_SUCCESS,
  EVALUATE_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

export function evaluate(params) {
  return {
    type: EVALUATE,
    params,
  };
}
export function businessSupplySuccess(data) {
  return {
    type: EVALUATE_SUCCESS,
    data,
  };
}
export function businessSupplyError(data) {
  return {
    type: EVALUATE_ERROR,
    data,
  };
}
