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
  // 实时消息详情
  REAL_TIME_MESSAGE,
} from './constants';

import {
  addAssociateAccountSuccess,
  addAssociateAccountError,
  // 实时消息详情
  realTimeMessageSuccess,
  realTimeMessageError,
} from './actions';

export function* fetchAccountOverView(params) {
  while (true) {
    const action = yield take(ADD_ASSOCIATE_ACCOUNT);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + 'situation/top';
    let data;
    if (action.type === ADD_ASSOCIATE_ACCOUNT) {
      try {
        data = yield call(requestPost, requestUrl, params);
        yield put(addAssociateAccountSuccess(data));
      } catch (e) {
        loading('end');
        yield put(addAssociateAccountError(e.message));
      }
    }
  }
}

// 实时消息查询
export function* fetchRealTimeMessage() {
  while (true) {
    const action = yield take(REAL_TIME_MESSAGE);
    let data;
    if (action.type === REAL_TIME_MESSAGE) {
      const requestUrl = ApiConfig.HOST_NAME_BASE_URL + 'situation/detail/' + action.params.id;
      try {
        data = yield call(requestPost, requestUrl, action.params);
        yield put(realTimeMessageSuccess(data));
      } catch (e) {
        loading('end');
        yield put(realTimeMessageError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView);
  yield fork(fetchRealTimeMessage);
}
