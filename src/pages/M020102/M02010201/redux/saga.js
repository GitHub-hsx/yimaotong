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
  // 最新供应
  NEW_SUPPLY,
  // 最新需求
  NEW_PURCHASE,
} from './constants';

import {
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
} from './actions';

// 发布供应
export function* fetchAccountOverView() {
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


export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView); // 新闻推荐
  yield fork(fetchNewSupply); // 最新供应
  yield fork(fetchNewPurchase); // 最新需求
}
