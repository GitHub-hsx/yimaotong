import {
  // 接口弹窗报错
  POPUP,
  //  我的评论
  MY_COMMENTS,
  MY_COMMENTS_SUCCESS,
  MY_COMMENTS_ERROR,
  CLEAR_MY_COMMENTS_LIST,
  TOTAL,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}

// 我的点赞
export function myComment(params) {
  return {
    type: MY_COMMENTS,
    params,
  };
}
export function myCommentSuccess(data) {
  return {
    type: MY_COMMENTS_SUCCESS,
    data,
  };
}
export function myCommentError(data) {
  return {
    type: MY_COMMENTS_ERROR,
    data,
  };
}
export function clearMyComment(data) {
  return {
    type: CLEAR_MY_COMMENTS_LIST,
    data,
  };
}
export function total(data) {
  return {
    type: TOTAL,
    data,
  };
}
