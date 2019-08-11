/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-14 18:18:58
 * @LastEditTime: 2019-08-11 17:25:42
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
  // 轮播图
  BANNER,
  // 实时消息详情
  REAL_TIME_MESSAGE,
  // 气质报告
  GAS_REPORT,
  // 企业认证
  ENT_AUTH,
  // 企业实名认证
  QUERY_AUTH,
} from './constants';

import {
  bannerSuccess,
  bannerError,
  // 实时消息详情
  realTimeMessageSuccess,
  realTimeMessageError,
  // 数据总共条数
  total,
  // 累计成交量
  transactionTotalSuccess,
  transactionTotalError,
  // 气质报告
  gasReportSuccess,
  gasReportError,
  // 企业认证
  entAuthSuccess,
  entAuthError,
  // 企业实名认证
  queryAuthSuccess,
  queryAuthError,
} from './actions';

// 轮播图
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(BANNER);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '//no-auth/article/banners';
    let data; // 轮播图
    let data2; // 累计成交量
    let data3; // 订单列表
    if (action.type === BANNER) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(bannerSuccess(data.data));
          /**
           * 累计成交量接口请求
           */
          const requestUrl2 = ApiConfig.HOST_NAME_BASE_URL + '/no-auth/business/order/transactionTotal';
          try {
            data2 = yield call(requestPost, requestUrl2, {});
            if (data2.status == '1') {
              yield put(transactionTotalSuccess(data2.data));
            } else {
              yield put(transactionTotalError(data2.message));
            }
          } catch (e) {
            yield put(transactionTotalError(e.message));
          }
          /**
           * 累计成交量
           */
        } else {
          yield put(bannerError(data.message));
        }
      } catch (e) {
        yield put(bannerError(e.message));
      }
    }
  }
}

// 实时消息查询
export function* fetchRealTimeMessage() {
  while (true) {
    const action = yield take(REAL_TIME_MESSAGE);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/no-auth/business/enterprise/entOffer';
    let data; // 轮播图
    if (action.type === REAL_TIME_MESSAGE) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(realTimeMessageSuccess(data.data));
          yield put(total(data.data));
        } else {
          yield put(realTimeMessageError(data.message));
        }
      } catch (e) {
        yield put(realTimeMessageError(e.message));
      }
    }
  }
}

// 气质报告
export function* fetchGasReport() {
  while (true) {
    const action = yield take(GAS_REPORT);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/no-auth/business/enterprise/gasReport';
    let data;
    if (action.type === GAS_REPORT) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(gasReportSuccess(data.data));
          history.push('/M020101/02');
        } else {
          yield put(gasReportError(data.message));
        }
      } catch (e) {
        yield put(gasReportError(e.message));
      }
    }
  }
}

// 企业认证
export function* fetchEntAuth() {
  while (true) {
    const action = yield take(ENT_AUTH);
    const requestUrl = ApiConfig.BASE_API_MEMBER + '/no-auth/member/entAuth';
    let data;
    let data1;
    if (action.type === ENT_AUTH) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(entAuthSuccess(data.data));
          if (data.data.authFlag == 2) {
            // 企业实名认证
            const queryMsg = {
              entBh: data.data.data.entBh,
            };
            try {
              const requestUrl2 = ApiConfig.HOST_NAME_BASE_URL + '/business/order/queryAuth';
              data1 = yield call(requestPost, requestUrl2, queryMsg);
              // alert(JSON.stringify(data1));
              if (data1.status == '1') {
                yield put(queryAuthSuccess(data1.data));
              } else {
                yield put(queryAuthSuccess(data1.data));
              }
            } catch (e) {
              // alert(JSON.stringify(e.message));

              yield put(queryAuthSuccess(e.message));
            }
          }
        } else {
          yield put(entAuthError(data.message));
        }
      } catch (e) {
        yield put(entAuthError(e.message));
      }
    }
  }
}

// 企业实名认证
export function* fetchQueryAuth() {
  while (true) {
    const action = yield take(ENT_AUTH);
    const requestUrl = ApiConfig.BASE_API_MEMBER + '/business/order/queryAuth';
    let data;
    if (action.type === ENT_AUTH) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(entAuthSuccess(data.data.data));
        } else {
          yield put(entAuthError(data.message));
        }
      } catch (e) {
        yield put(entAuthError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView);
  yield fork(fetchRealTimeMessage);
  yield fork(fetchGasReport); // 气质报告
  yield fork(fetchEntAuth); // 企业认证
  yield fork(fetchQueryAuth); // 企业实名认证
}
