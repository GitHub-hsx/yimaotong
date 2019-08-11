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
  ADD_ASSOCIATE_ACCOUNT,
  // 获取新闻详情
  NEWS_DETAILS,
  // 行情列表消息获取
  SITUATION_LIST,
  // 视频列表
  VIDEO,
} from './constants';

import {
  addAssociateAccountSuccess,
  addAssociateAccountError,
  // 获取新闻详情
  getNewsDetailsSuccess,
  getNewsDetailsError,
  // 行情列表获取
  situationListSuccess,
  situationListError,
  // 保存请求的新闻的总长度
  total,
  // 视频列表
  videoSuccess,
  videoError,
} from './actions';

// 获取新闻列表
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(ADD_ASSOCIATE_ACCOUNT);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/no-auth/article/news/list';
    let data;
    if (action.type === ADD_ASSOCIATE_ACCOUNT) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(addAssociateAccountSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(addAssociateAccountError(data.message));
        }
      } catch (e) {
        yield put(addAssociateAccountError(e.message));
      }
    }
  }
}

// 获取行情列表
export function* fetchSituationList() {
  while (true) {
    const action = yield take(SITUATION_LIST);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/no-auth/article/situation/list';
    let data;
    if (action.type === SITUATION_LIST) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(situationListSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(situationListError(data.message));
        }
      } catch (e) {
        yield put(situationListError(e.message));
      }
    }
  }
}

// 获取视频列表
export function* fetchVideo() {
  while (true) {
    const action = yield take(VIDEO);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/no-auth/article/video/videos';
    let data;
    if (action.type === VIDEO) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(videoSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(videoError(data.message));
        }
      } catch (e) {
        yield put(situationListError(e.message));
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
  yield fork(fetchAccountOverView); // 新闻推荐
  yield fork(fetchNewsDetails);
  yield fork(fetchSituationList); // 行情获取
  yield fork(fetchVideo); // 视频列表
}
