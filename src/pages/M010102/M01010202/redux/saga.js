/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 19:48:14
 * @LastEditTime: 2019-08-10 18:33:47
 * @LastEditors: Please set LastEditors
 */
import {
  call,
  put,
  take,
  fork,
} from 'redux-saga/effects';
import { requestPost } from 'utils/request';
import history from 'utils/history';
import ApiConfig from 'constants/ApiConfig';
import {
  loading,
} from 'utils/commonFunction';
import {
  // 获取评论列表
  NEWS_COMMENT_LIST,
  // 获取新闻详情
  NEWS_DETAILS,
} from './constants';

import {
  // 新闻评论列表
  newsCommentListSuccess,
  newsCommentListError,
  // 评论总条数
  total,
  // 新闻详情
  getNewsDetailsSuccess,
  getNewsDetailsError,
} from './actions';

export function* fetchNewsCommentList() {
  while (true) {
    const action = yield take(NEWS_COMMENT_LIST);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/news/commentList';
    let data;
    if (action.type === NEWS_COMMENT_LIST) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(newsCommentListSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(newsCommentListError(data.message));
        }
      } catch (e) {
        yield put(newsCommentListError(e.message));
      }
    }
  }
}

// 获取新闻详情
export function* fetchNewsDetails() {
  while (true) {
    const action = yield take(NEWS_DETAILS);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/news/detail';
    let data;
    if (action.type === NEWS_DETAILS) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        // alert(JSON.stringify(data));

        if (data.status == '1') {
          yield put(getNewsDetailsSuccess(data.data));
        } else {
          yield put(getNewsDetailsError(data.message));
        }
      } catch (e) {
        yield put(getNewsDetailsError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchNewsCommentList);
  yield fork(fetchNewsDetails);
}
