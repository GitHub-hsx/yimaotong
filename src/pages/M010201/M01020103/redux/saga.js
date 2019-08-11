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
 VIDEO_MY_THUMBS,
} from './constants';

import {
  // 我的点赞
  videoMyThumbsSuccess,
  videoMyThumbsError,
  total, // 数据总条数
} from './actions';

// 获取我的点赞
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(VIDEO_MY_THUMBS);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/video/myThumbs';
    let data;
    if (action.type === VIDEO_MY_THUMBS) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(videoMyThumbsSuccess(data.data.records));
          yield put(total(data.data.total));
          if (action.params.current == 1 && data.data.records.length === 0) {
            yield put(videoMyThumbsError(data.message + '暂无数据'));
          }
        } else {
          yield put(videoMyThumbsError(data.message));
        }
      } catch (e) {
        yield put(videoMyThumbsError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView);
}
