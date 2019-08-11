import {
  call,
  put,
  take,
} from 'redux-saga/effects';
import { requestPost } from 'utils/request';
import history from 'utils/history';
import ApiConfig from 'constants/ApiConfig';
import {
  loading,
} from 'utils/commonFunction';
import {
  ADD_ASSOCIATE_ACCOUNT,
} from './constants';

import {
  addAssociateAccountSuccess,
  addAssociateAccountError,
} from './actions';

export function* fetchAccountOverView(params) {
  const requestUrl = ApiConfig.HOST_NAME_BASE_URL + 'situation/list';
  let data;
  try {
    data = yield call(requestPost, requestUrl, params);
    yield put(addAssociateAccountSuccess(data));
  } catch (e) {
    loading('end');
    yield put(addAssociateAccountError(e.message));
  }
}

export default function* watchNoCardCash() {
  while (true) {
    const action = yield take(ADD_ASSOCIATE_ACCOUNT);
    if (action.type === ADD_ASSOCIATE_ACCOUNT) {
      yield call(fetchAccountOverView, action.params);
    }
  }
}
