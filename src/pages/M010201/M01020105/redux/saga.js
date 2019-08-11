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
// 我的评论
  MY_COMMENTS,
} from './constants';

import {
  // 我的点赞
  myCommentSuccess,
  myCommentError,
  total,
} from './actions';

// 获取我的点赞
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(MY_COMMENTS);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/video/myComments';
    let data;
    if (action.type === MY_COMMENTS) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(myCommentSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(myCommentError(data.message));
        }
      } catch (e) {
        yield put(myCommentError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView);
}
