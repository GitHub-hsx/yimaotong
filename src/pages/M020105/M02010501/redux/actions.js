import {
  // 接口弹窗报错
  POPUP,
  // 发布供应
  BUSINESS_SUPPLY,
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 图片批量上传
  BATCH_UPLOAD,
  BATCH_UPLOAD_SUCCESS,
  BATCH_UPLOAD_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

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
// 图片批量上传
export function batchUpload(params) {
  return {
    type: BATCH_UPLOAD,
    params,
  };
}
export function batchUploadSuccess(data) {
  return {
    type: BATCH_UPLOAD_SUCCESS,
    data,
  };
}
export function batchUploadError(data) {
  return {
    type: BATCH_UPLOAD_ERROR,
    data,
  };
}
