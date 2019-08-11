/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 17:37:28
 * @LastEditTime: 2019-08-11 21:07:47
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
  // 企业评价列表
  BUSINESS_SUPPLY,
  // 企业综合评价
  OVERAL_EVALUATE,
} from './constants';

import {
  // 企业评论列表
  businessSupplySuccess,
  businessSupplyError,
  // 企业综合评价
  overallEvaluateSuccess,
  overallEvaluateError,
} from './actions';

// 企业评论列表
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(BUSINESS_SUPPLY);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/enterprise/evaluateList';
    let data;
    if (action.type === BUSINESS_SUPPLY) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(businessSupplySuccess(data.data.records));
        } else {
          yield put(businessSupplyError(data.message));
        }
      } catch (e) {
        yield put(businessSupplyError(e.message));
      }
    }
  }
}

// 企业综合评价
export function* fetchOverallEvaluate() {
  while (true) {
    const action = yield take(OVERAL_EVALUATE);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/enterprise/overallEvaluate';
    let data;
    if (action.type === OVERAL_EVALUATE) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(overallEvaluateSuccess(data.data.records));
        } else {
          yield put(overallEvaluateError(data.message));
        }
      } catch (e) {
        yield put(overallEvaluateError(e.message));
      }
    }
  }
}


export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView); // 新闻推荐
  yield fork(fetchOverallEvaluate); // 企业综合评价
}
