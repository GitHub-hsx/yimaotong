/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 11:33:52
 * @LastEditTime: 2019-08-11 11:52:11
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
  // 发布供应
  BUSINESS_SUPPLY,
  // 删除或者关闭订单
  CANCEL,
  // 合同签署请求
  CONTRACT,
} from './constants';

import {
  // 发布供应
  businessSupplySuccess,
  businessSupplyError,
  // 数据总条数
  total,
  // 获取服务器时间
  serviceTimeSuccess,
  serviceTimeError,
  // 取消或者删除订单
  cancelSuccess,
  cancelError,
  // 合同签署请求
  contract,
  contractSuccess,
  contractError,
} from './actions';

// 发布供应
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(BUSINESS_SUPPLY);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/order/orderList';
    let data;
    let data2;
    // 请求服务器时间
    const requestUrl2 = ApiConfig.HOST_NAME_BASE_URL + '/business/order/serverTime';
    try {
      data2 = yield call(requestPost, requestUrl2);
      if (data2.status == 1) {
        yield put(serviceTimeSuccess(data2.data.serverTime));
      } else {
        yield put(serviceTimeError(data2.message));
      }
    } catch (e) {
      yield put(serviceTimeError(e.message));
    }
    if (action.type === BUSINESS_SUPPLY) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(businessSupplySuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(businessSupplyError(data.message));
        }
      } catch (e) {
        yield put(businessSupplyError(e.message));
      }
    }
  }
}

// 取消或者删除订单
export function* fetchCancel() {
  while (true) {
    const action = yield take(CANCEL);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/order/cancel';
    let data;
    if (action.type === CANCEL) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(cancelSuccess(data.data.records));
          yield put(cancelError('操作成功'));
        } else {
          yield put(cancelError(data.message));
        }
      } catch (e) {
        yield put(cancelError(e.message));
      }
    }
  }
}

// 合同签署请求
export function* fetchContract() {
  while (true) {
    const action = yield take(CANCEL);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/order/contract';
    let data;
    if (action.type === CANCEL) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(contractSuccess(data.data.records));
        } else {
          yield put(contractError(data.message));
        }
      } catch (e) {
        yield put(contractError(e.message));
      }
    }
  }
}


export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView); // 新闻推荐
  yield fork(fetchCancel); // 取消或者删除订单
  yield fork(fetchContract); // 合同签署请求
}
