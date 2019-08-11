/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-14 18:18:58
 * @LastEditTime: 2019-08-10 15:46:00
 * @LastEditors: Please set LastEditors
 */
import {
  // 轮播图
  BANNER,
  BANNER_SUCCESS,
  BANNER_ERROR,
  // 接口弹窗报错
  POPUP,
  // 实时消息详情
  REAL_TIME_MESSAGE,
  REAL_TIME_MESSAGE_SUCCESS,
  REAL_TIME_MESSAGE_ERROR,
  // 我的发布
  BUSINESS_SUPPLY,
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 最新供应
  NEW_SUPPLY,
  NEW_SUPPLY_SUCCESS,
  NEW_SUPPLY_ERROR,
  // 最新需求
  NEW_PURCHASE,
  NEW_PURCHASE_SUCCESS,
  NEW_PURCHASE_ERROR,
  // 数据操作
  TOTAL,
  CLEAR_LIST,
  // 累计成交量
  TRANS_ACTION_TOTAL,
  TRANS_ACTION_TOTAL_SUCCESS,
  TRANS_ACTION_TOTAL_ERROR,
  // 气质报告
  GAS_REPORT,
  GAS_REPORT_SUCCESS,
  GAS_REPORT_ERROR,
  // 企业认证
  ENT_AUTH,
  ENT_AUTH_SUCCESS,
  ENT_AUTH_ERROR,
  // 企业实名认证
  QUERY_AUTH,
  QUERY_AUTH_SUCCESS,
  QUERY_AUTH_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

export function banner(params) {
  return {
    type: BANNER,
    params,
  };
}
export function bannerSuccess(data) {
  return {
    type: BANNER_SUCCESS,
    data,
  };
}
export function bannerError(data) {
  return {
    type: BANNER_ERROR,
    data,
  };
}
// 实时液价
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
export function myBusiness(params) {
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
// 最新供应
export function newSupply(params) {
  return {
    type: NEW_SUPPLY,
    params,
  };
}
export function newSupplySuccess(data) {
  return {
    type: NEW_SUPPLY_SUCCESS,
    data,
  };
}
export function newSupplyError(data) {
  return {
    type: NEW_SUPPLY_ERROR,
    data,
  };
}
// 最新需求
export function newPurchase(params) {
  return {
    type: NEW_PURCHASE,
    params,
  };
}
export function newPurchaseSuccess(data) {
  return {
    type: NEW_PURCHASE_SUCCESS,
    data,
  };
}
export function newPurchaseError(data) {
  return {
    type: NEW_PURCHASE_ERROR,
    data,
  };
}
// 数据操作
export function total(data) {
  return {
    type: TOTAL,
    data,
  };
}
export function clearList(data) {
  return {
    type: CLEAR_LIST,
    data,
  };
}
// 最新需求
export function transactionTotal(params) {
  return {
    type: TRANS_ACTION_TOTAL,
    params,
  };
}
export function transactionTotalSuccess(data) {
  return {
    type: TRANS_ACTION_TOTAL_SUCCESS,
    data,
  };
}
export function transactionTotalError(data) {
  return {
    type: TRANS_ACTION_TOTAL_ERROR,
    data,
  };
}
// 气质报告
export function gasReport(params) {
  return {
    type: GAS_REPORT,
    params,
  };
}
export function gasReportSuccess(data) {
  return {
    type: GAS_REPORT_SUCCESS,
    data,
  };
}
export function gasReportError(data) {
  return {
    type: GAS_REPORT_ERROR,
    data,
  };
}
// 企业认证
export function entAuth(params) {
  return {
    type: ENT_AUTH,
    params,
  };
}
export function entAuthSuccess(data) {
  return {
    type: ENT_AUTH_SUCCESS,
    data,
  };
}
export function entAuthError(data) {
  return {
    type: ENT_AUTH_ERROR,
    data,
  };
}
// 企业实名认证
export function queryAuth(params) {
  return {
    type: QUERY_AUTH,
    params,
  };
}
export function queryAuthSuccess(data) {
  return {
    type: QUERY_AUTH_SUCCESS,
    data,
  };
}
export function queryAuthError(data) {
  return {
    type: QUERY_AUTH_ERROR,
    data,
  };
}
