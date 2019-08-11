import {
  // 接口弹窗报错
  POPUP,
  // 新闻点赞
  NEWS_AGREE,
  NEWS_AGREE_SUCCESS,
  NEWS_AGREE_ERROR,
  // 新增评论
  NEWS_COMMENT_ADD,
  NEWS_COMMENT_ADD_SUCCESS,
  NEWS_COMMENT_ADD_ERROR,
  // 评论列表
  NEWS_COMMENT_LIST,
  NEWS_COMMENT_LIST_SUCCESS,
  NEWS_COMMENT_LIST_ERROR,
  CLEAR_COMMENT_LIST,
  // 收藏
  NEWS_COLLECT,
  NEWS_COLLECT_SUCCESS,
  NEWS_COLLECT_ERROR,
  // 新闻总条数
  TOTAL,
  // 获取新闻详情
  NEWS_DETAILS,
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_ERROR,
  // 新闻相关操作
  NEWS_RELATIVE,
  NEWS_RELATIVE_SUCCESS,
  NEWS_RELATIVE_ERROR,
} from './constants';

export function popup(action) {
  return {
    type: POPUP,
    action,
  };
}
// 新闻点赞
export function newsAgree(params) {
  return {
    type: NEWS_AGREE,
    params,
  };
}
export function newsAgreeSuccess(data) {
  return {
    type: NEWS_AGREE_SUCCESS,
    data,
  };
}
export function newsAgreeError(data) {
  return {
    type: NEWS_AGREE_ERROR,
    data,
  };
}
// 新增评论
export function newsAddComment(params) {
  return {
    type: NEWS_COMMENT_ADD,
    params,
  };
}
export function newsAddCommentSuccess(data) {
  return {
    type: NEWS_COMMENT_ADD_SUCCESS,
    data,
  };
}
export function newsAddCommentError(data) {
  return {
    type: NEWS_COMMENT_ADD_ERROR,
    data,
  };
}
// 评论列表
export function newsCommentList(params) {
  return {
    type: NEWS_COMMENT_LIST,
    params,
  };
}
export function newsCommentListSuccess(data) {
  return {
    type: NEWS_COMMENT_LIST_SUCCESS,
    data,
  };
}
export function newsCommentListError(data) {
  return {
    type: NEWS_COMMENT_LIST_ERROR,
    data,
  };
}
export function clearCommentList(data) {
  return {
    type: CLEAR_COMMENT_LIST,
    data,
  };
}
// 新闻收藏
export function newsCollect(params) {
  return {
    type: NEWS_COLLECT,
    params,
  };
}
export function newsCollectSuccess(data) {
  return {
    type: NEWS_COLLECT_SUCCESS,
    data,
  };
}
export function newsCollectError(data) {
  return {
    type: NEWS_COLLECT_ERROR,
    data,
  };
}
// 评论总条数
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
// 新闻相关操作
export function newsRelative(params) {
  return {
    type: NEWS_RELATIVE,
    params,
  };
}
export function newsRelativeSuccess(data) {
  return {
    type: NEWS_RELATIVE_SUCCESS,
    data,
  };
}
export function newsRelativeError(data) {
  return {
    type: NEWS_RELATIVE_ERROR,
    data,
  };
}
