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
// 我的点赞
  MY_VIDEOS,
} from './constants';

import {
  // 我的点赞
  myVideosSuccess,
  myVideosError,
  total,
} from './actions';

// 获取我的点赞
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(MY_VIDEOS);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/video/myVideos';
    let data;
    if (action.type === MY_VIDEOS) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(myVideosSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(myVideosError(data.message));
        }
      } catch (e) {
        yield put(myVideosError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView);
}
