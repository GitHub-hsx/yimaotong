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
  // 图片批量上传
  BATCH_UPLOAD,
} from './constants';

import {
  // 发布供应
  businessSupplySuccess,
  businessSupplyError,
  // 图片批量上传
  batchUploadSuccess,
  batchUploadError,
} from './actions';

// 发布供应
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(BATCH_UPLOAD);
    const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/file/batchUpload';
    let data;
    if (action.type === BATCH_UPLOAD) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(batchUploadSuccess(data.data.records));
        } else {
          yield put(batchUploadError(data.message));
        }
      } catch (e) {
        yield put(batchUploadError(e.message));
      }
    }
  }
}


export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView); // 新闻推荐
}
