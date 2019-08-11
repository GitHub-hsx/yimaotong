import {
  // 接口弹窗报错
  POPUP,
  //  我的点赞
  VIDEO_MY_THUMBS,
  VIDEO_MY_THUMBS_SUCCESS,
  VIDEO_MY_THUMBS_ERROR,
  CLEAR_MY_THUMBS_LIST, // 清空请求回来的数据
  TOTAL, // 保存点赞数据的总条数
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

// 我的点赞
export function videoMyThumbs(params) {
  return {
    type: VIDEO_MY_THUMBS,
    params,
  };
}
export function videoMyThumbsSuccess(data) {
  return {
    type: VIDEO_MY_THUMBS_SUCCESS,
    data,
  };
}
export function videoMyThumbsError(data) {
  return {
    type: VIDEO_MY_THUMBS_ERROR,
    data,
  };
}
export function clearMyThumbs(data) {
  return {
    type: CLEAR_MY_THUMBS_LIST,
    data,
  };
}
export function total(data) {
  return {
    type: TOTAL,
    data,
  };
}
