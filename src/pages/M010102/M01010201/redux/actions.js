import {
  ADD_ASSOCIATE_ACCOUNT,
  ADD_ASSOCIATE_ACCOUNT_SUCCESS,
  ADD_ASSOCIATE_ACCOUNT_ERROR,
  CLEAR_NEWS_LIST,
  // 接口弹窗报错
  POPUP,
  // 获取新闻详情
  NEWS_DETAILS,
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_ERROR,
  // 行情分页接口查询
  SITUATION_LIST,
  SITUATION_LIST_SUCCESS,
  SITUATION_LIST_ERROR,
  // 请求新闻的总数
  TOTAL,
  // 视频列表请求
  VIDEO,
  VIDEO_SUCCESS,
  VIDEO_ERROR,
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
// 清空news列表
export function clearNewsList(data) {
  return {
    type: CLEAR_NEWS_LIST,
    data,
  };
}
// 获取新闻详情
export function getNewsDetails(params) {
  return {
    type: NEWS_DETAILS,
    params,
  };
}
export function getNewsDetailsSuccess(data) {
  return {
    type: NEWS_DETAILS_SUCCESS,
    data,
  };
}
export function getNewsDetailsError(data) {
  return {
    type: NEWS_DETAILS_ERROR,
    data,
  };
}
// 行情分页接口查询
export function situationList(params) {
  return {
    type: SITUATION_LIST,
    params,
  };
}
export function situationListSuccess(data) {
  return {
    type: SITUATION_LIST_SUCCESS,
    data,
  };
}
export function situationListError(data) {
  return {
    type: SITUATION_LIST_ERROR,
    data,
  };
}
// 所请求新闻的总数
export function total(data) {
  return {
    type: TOTAL,
    data,
  };
}
// 视频请求列表
export function video(params) {
  return {
    type: VIDEO,
    params,
  };
}
export function videoSuccess(data) {
  return {
    type: VIDEO_SUCCESS,
    data,
  };
}
export function videoError(data) {
  return {
    type: VIDEO_ERROR,
    data,
  };
}
