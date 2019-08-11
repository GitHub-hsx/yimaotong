import {
  // 接口弹窗报错
  POPUP,
  //  我的点赞
  MY_VIDEOS,
  MY_VIDEOS_SUCCESS,
  MY_VIDEOS_ERROR,
  CLEAR_MY_VIDEOS_LIST,
  TOTAL,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

// 我的点赞
export function myVideos(params) {
  return {
    type: MY_VIDEOS,
    params,
  };
}
export function myVideosSuccess(data) {
  return {
    type: MY_VIDEOS_SUCCESS,
    data,
  };
}
export function myVideosError(data) {
  return {
    type: MY_VIDEOS_ERROR,
    data,
  };
}
export function clearMyVideos(data) {
  return {
    type: CLEAR_MY_VIDEOS_LIST,
    data,
  };
}
export function total(data) {
  return {
    type: TOTAL,
    data,
  };
}
