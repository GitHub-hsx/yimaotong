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
  // 发布供应
  BUSINESS_SUPPLY,
  // 最新供应
  NEW_SUPPLY,
  // 最新需求
  NEW_PURCHASE,
  // 气质报告
  GAS_REPORT,
} from './constants';

import {
  bannerSuccess,
  bannerError,
  // 实时消息详情
  realTimeMessageSuccess,
  realTimeMessageError,
  // 我的发布
  businessSupplySuccess,
  businessSupplyError,
  // 最新供应
  newSupplySuccess,
  newSupplyError,
  // 最细需求
  newPurchaseSuccess,
  newPurchaseError,
  // 数据总共条数
  total,
  // 累计成交量
  transactionTotalSuccess,
  transactionTotalError,
  // 气质报告
  gasReportSuccess,
  gasReportError,
} from './actions';

// 轮播图
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(BANNER);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/article/banners';
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
          const requestUrl2 = ApiConfig.HOST_NAME_BASE_URL + '/business/order/transactionTotal';
          try {
            data2 = yield call(requestPost, requestUrl2, {});
            if (data2.status == '1') {
              yield put(transactionTotalSuccess(data2.data));
              /**
               * 订单列表
               */
              const requestUrl3 = ApiConfig.HOST_NAME_BASE_URL + '/business/enterprise/entOffer';
              const message = {
                current: 1,
                pageSize: 20,
                priceDate: '2019-07-04',
              };
              try {
                data3 = yield call(requestPost, requestUrl3, message);
                if (data3.status == '1') {
                  yield put(realTimeMessageSuccess(data3.data));
                } else {
                  yield put(realTimeMessageError(data3.message));
                }
              } catch (e) {
                yield put(realTimeMessageError(e.message));
              }

              /**
               * 订单列表
               */
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
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/enterprise/entOffer';
    let data; // 轮播图
    if (action.type === REAL_TIME_MESSAGE) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(realTimeMessageSuccess(data.data.records));
        } else {
          yield put(realTimeMessageError(data.message));
        }
      } catch (e) {
        yield put(realTimeMessageError(e.message));
      }
    }
  }
}

// 发布供应
export function* fetchMine() {
  while (true) {
    const action = yield take(BUSINESS_SUPPLY);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/purch/myBusiness';
    let data;
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

// 最新供应
export function* fetchNewSupply() {
  while (true) {
    const action = yield take(NEW_SUPPLY);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/supply/newSupply';
    let data;
    if (action.type === NEW_SUPPLY) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(newSupplySuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(newSupplyError(data.message));
        }
      } catch (e) {
        yield put(newSupplyError(e.message));
      }
    }
  }
}

// 最新需求
export function* fetchNewPurchase() {
  while (true) {
    const action = yield take(NEW_PURCHASE);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/purch/newSupply';
    let data;
    if (action.type === NEW_PURCHASE) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(newPurchaseSuccess(data.data.records));
          yield put(total(data.data.total));
        } else {
          yield put(newPurchaseError(data.message));
        }
      } catch (e) {
        yield put(newPurchaseError(e.message));
      }
    }
  }
}

// 气质报告
export function* fetchGasReport() {
  while (true) {
    const action = yield take(GAS_REPORT);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/enterprise/gasReport';
    let data;
    if (action.type === GAS_REPORT) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(gasReportError(data.data));
        } else {
          yield put(gasReportError(data.message));
        }
      } catch (e) {
        yield put(gasReportError(e.message));
      }
    }
  }
}

export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView);
  yield fork(fetchRealTimeMessage);
  yield fork(fetchMine); // 我的发布
  yield fork(fetchNewSupply); // 最新供应
  yield fork(fetchNewPurchase); // 最新需求
  yield fork(fetchGasReport); // 气质报告
}
