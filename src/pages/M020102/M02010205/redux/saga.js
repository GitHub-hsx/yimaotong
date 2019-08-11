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
} from './constants';

import {
  // 发布供应
  businessSupplySuccess,
  businessSupplyError,
} from './actions';

// 发布供应
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(BUSINESS_SUPPLY);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/supply/supplyOffer';
    let data;
    if (action.type === BUSINESS_SUPPLY) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(businessSupplySuccess(data.data.records));
          yield put(businessSupplyError('您的采购信息已提交，请等待卖家确认'));
        } else {
          yield put(businessSupplyError(data.message));
        }
      } catch (e) {
        yield put(businessSupplyError(e.message));
      }
    }
  }
}


export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView); // 新闻推荐
}
