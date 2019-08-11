import {
  // 接口弹窗报错
  POPUP,
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
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
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