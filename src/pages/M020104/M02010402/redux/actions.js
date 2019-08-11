/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-11 12:22:31
 * @LastEditors: Please set LastEditors
 */
import {
  // 接口弹窗报错
  POPUP,
  // 订单列表
  BUSINESS_SUPPLY,
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 清空数据
  CLEAR_DATA,
  // 数据条数
  TOTAL,
  // 服务器时间
  SERVICE_TIME,
  SERVICE_TIME_SUCCESS,
  SERVICE_TIME_ERROR,
  // 删除或者关闭订单
  CANCEL,
  CANCEL_SUCCESS,
  CANCEL_ERROR,
  // 合同签署请求
  CONTRACT,
  CONTRACT_SUCCESS,
  CONTRACT_ERROR,
  // 生成订单
  CREATE,
  CREATE_SUCCESS,
  CREATE_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

export function orderList(params) {
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
// 清空数据
export function clearData(data) {
  return {
    type: CLEAR_DATA,
    data,
  };
}
export function total(data) {
  return {
    type: TOTAL,
    data,
  };
}
// 获取服务器时间
export function serviceTime(params) {
  return {
    type: SERVICE_TIME,
    params,
  };
}
export function serviceTimeSuccess(data) {
  return {
    type: SERVICE_TIME_SUCCESS,
    data,
  };
}
export function serviceTimeError(data) {
  return {
    type: SERVICE_TIME_ERROR,
    data,
  };
}
// 删除或者关闭订单
export function cancel(params) {
  return {
    type: CANCEL,
    params,
  };
}
export function cancelSuccess(data) {
  return {
    type: CANCEL_SUCCESS,
    data,
  };
}
export function cancelError(data) {
  return {
    type: CANCEL_ERROR,
    data,
  };
}
// 合同签署
export function contract(params) {
  return {
    type: CONTRACT,
    params,
  };
}
export function contractSuccess(data) {
  return {
    type: CONTRACT_SUCCESS,
    data,
  };
}
export function contractError(data) {
  return {
    type: CONTRACT_ERROR,
    data,
  };
}
// 生成订单
export function create(params) {
  return {
    type: CREATE,
    params,
  };
}
export function createSuccess(data) {
  return {
    type: CREATE_SUCCESS,
    data,
  };
}
export function createError(data) {
  return {
    type: CREATE_ERROR,
    data,
  };
}
