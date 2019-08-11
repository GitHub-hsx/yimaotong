import {
  // 接口弹窗报错
  POPUP,
  // 资讯收藏
  NEWS_MY_COLLECTION,
  NEWS_MY_COLLECTION_SUCCESS,
  NEWS_MY_COLLECTION_ERROR,
  CLEAR_NEWS,
  //  视频收藏
  VIDEO_MY_COLLECTION,
  VIDEO_MY_COLLECTION_SUCCESS,
  VIDEO_MY_COLLECTION_ERROR,
  CLEAR_VIDEO,
  // 数据总数
  TOTAL,
  // 获取新闻详情
  NEWS_DETAILS,
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

// 资讯收藏
export function newsMyCollection(params) {
  return {
    type: NEWS_MY_COLLECTION,
    params,
  };
}
export function newsMyCollectionSuccess(data) {
  return {
    type: NEWS_MY_COLLECTION_SUCCESS,
    data,
  };
}
export function newsMyCollectionError(data) {
  return {
    type: NEWS_MY_COLLECTION_ERROR,
    data,
  };
}
export function clearNews(data) {
  return {
    type: CLEAR_NEWS,
    data,
  };
}
// 视频收藏
export function videoMyCollect(params) {
  return {
    type: VIDEO_MY_COLLECTION,
    params,
  };
}
export function videoMyCollectSuccess(data) {
  return {
    type: VIDEO_MY_COLLECTION_SUCCESS,
    data,
  };
}
export function videoMyCollectError(data) {
  return {
    type: VIDEO_MY_COLLECTION_ERROR,
    data,
  };
}
export function clearVideo(data) {
  return {
    type: CLEAR_VIDEO,
    data,
  };
}

// 总数据
export function total(data) {
  return {
    type: TOTAL,
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
