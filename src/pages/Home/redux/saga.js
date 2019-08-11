/**
 *  saga
 */

import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import request from 'utils/request';
import ApiConfig from 'constants/ApiConfig';

import {
  GET_API_DATA_BASE,
} from './constants';

import {
  getDataSuccess,
  getDataError,
} from './actions';

/**
 * saga worker
 */
export function* fetchApiBase(params) {
  const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
  let data;
  const newParams = {
    method: 'POST',
    // mode: 'no-cors',
    // credentials: 'include', // 强制加入cookie
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
  try {
    // yield put(actions)
    // 获取数据请求之后的数据
    data = yield request(requestUrl, newParams);
    const secondData = {
      head: newParams.head,
      message: newParams.message,
    };
    secondData.head.type = '1111';
    data = yield request(requestUrl, secondData);
    // data = yield call(request, requestUrl, newParams);
    if (data.resCode === '1') {
      yield put(getDataSuccess(data));
    } else {
      yield put(getDataError(data.message));
    }
  } catch (e) {
    yield put(getDataError(e));
  }
}
/**
 * saga watcher 用于监听
 * 发起的action 如果匹配则触发 saga worker的方法
 * 如下 worker方法为 fetchApiBase
 */
export default function* watchGetData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_API_DATA_BASE, fetchApiBase);
}
