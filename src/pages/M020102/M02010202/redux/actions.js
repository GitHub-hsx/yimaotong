/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 17:37:28
 * @LastEditTime: 2019-08-11 21:18:46
 * @LastEditors: Please set LastEditors
 */
import {
  // 接口弹窗报错
  POPUP,
  // 企业评价列表
  BUSINESS_SUPPLY,
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 企业综合评价
  OVERAL_EVALUATE,
  OVERAL_EVALUATE_SUCCESS,
  OVERAL_EVALUATE_ERROR,
  // 清楚store中的list数据
  CLEAR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

// 企业评价列表
export function businessSupply(params) {
  return {
    type: BUSINESS_SUPPLY,
    params,
  };
}
export function businessSupplySuccess(data) {
  return {
    type: BUSINESS_SUPPLY_SUCCESS,
    data,
  };
}
export function businessSupplyError(data) {
  return {
    type: BUSINESS_SUPPLY_ERROR,
    data,
  };
}
// 企业综合评价
export function overallEvaluate(params) {
  return {
    type: OVERAL_EVALUATE,
    params,
  };
}
export function overallEvaluateSuccess(data) {
  return {
    type: OVERAL_EVALUATE_SUCCESS,
    data,
  };
}
export function overallEvaluateError(data) {
  return {
    type: OVERAL_EVALUATE_ERROR,
    data,
  };
}
// 清楚数据
export function clear(data) {
  return {
    type: CLEAR,
    data,
  };
}