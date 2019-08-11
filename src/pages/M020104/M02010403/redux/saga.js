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
  // 订单评价
  EVALUATE,
} from './constants';

import {
  // 发布供应
  businessSupplySuccess,
  businessSupplyError,
} from './actions';

// 订单评价
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(EVALUATE);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/order/evaluate';
    let data;
    if (action.type === EVALUATE) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(businessSupplySuccess(data));
          yield put(businessSupplyError('评价成功'));
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
