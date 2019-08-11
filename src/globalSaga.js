/**
 *  saga
 */

import {
  call,
  take,
  put,
} from 'redux-saga/effects';

import { requestPost } from 'utils/request';
import ApiConfig from 'constants/ApiConfig';
import createRequestBody from 'utils/createBody';

import {
  POST_BASE_LOGIN,
  loginSuccess,
  loginError,
} from './globalActions';

export function* fetchLoginPost(params) {
  const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
  // const requestUrl = 'http://localhost:9000/api/otherBankPayAccountQuery';
  let data;
  try {
    // 获取数据请求之后的数据
    data = yield call(requestPost, requestUrl, params);
    localStorage.setItem('data', JSON.stringify(data));
    // const tokenParams = createRequestBody({
    //   type: 'getToken',
    // });
    // token = yield call(requestPost, requestUrl, tokenParams);
    if (data.resCode === '1') {
      yield put(loginSuccess(data));
    } else {
      yield put(loginError('failed'));
    }
  } catch (e) {
    yield put(loginError(e.message));
  }
}


export default function* watchGlobal() {
  while (true) {
    const action = yield take(POST_BASE_LOGIN);
    if (action.type === POST_BASE_LOGIN) {
      yield call(fetchLoginPost, action.params);
    }
  }
}
