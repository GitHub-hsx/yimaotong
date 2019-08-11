/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 20:25:01
 * @LastEditTime: 2019-08-11 02:02:35
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
  // 资讯收藏
  NEWS_MY_COLLECTION,
  //  视频收藏
  VIDEO_MY_COLLECTION,
  // 获取新闻详情
  NEWS_DETAILS,
} from './constants';

import {
  // 资讯收藏
  newsMyCollectionSuccess,
  newsMyCollectionError,
  //  视频收藏
  videoMyCollectSuccess,
  videoMyCollectError,
  // 数据总数
  total,
  // 获取新闻详情
  getNewsDetailsSuccess,
  getNewsDetailsError,
} from './actions';

// 资讯收藏
export function* fetchNewsCollection() {
  while (true) {
    const action = yield take(NEWS_MY_COLLECTION);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/news/myCollection';
    let data;
    if (action.type === NEWS_MY_COLLECTION) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(newsMyCollectionSuccess(data.data));
          yield put(total(data.data.length));
        } else {
          yield put(newsMyCollectionError(data.message));
        }
      } catch (e) {
        yield put(newsMyCollectionError(e.message));
      }
    }
  }
}

// 视频收藏
export function* fetchVideoCollection() {
  while (true) {
    const action = yield take(VIDEO_MY_COLLECTION);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/video/myCollection';
    let data;
    if (action.type === VIDEO_MY_COLLECTION) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(videoMyCollectSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(videoMyCollectError(data.message));
        }
      } catch (e) {
        yield put(videoMyCollectError(e.message));
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
        if (data.status == '1') {
          yield put(getNewsDetailsSuccess(data.data));
          history.push({
            pathname: '/M010102/02',
            id: action.params.id,
          });
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
  yield fork(fetchNewsCollection); // 资讯收藏
  yield fork(fetchVideoCollection); // 视频收藏
  yield fork(fetchNewsDetails); // 新闻详情
}
