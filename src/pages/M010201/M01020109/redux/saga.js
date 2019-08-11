/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 21:43:49
 * @LastEditTime: 2019-08-10 13:50:08
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
UPDATE,
} from './constants';

import {
  updateSuccess,
  updateError,
  popup,
} from './actions';

// 获取新闻列表
export function* fetchAccountOverView() {
  while (true) {
    const action = yield take(UPDATE);
    const requestUrl = ApiConfig.BASE_API_MEMBER + '/no-auth/member/update';
    let data;
    if (action.type === UPDATE) {
      try {
        data = yield call(requestPost, requestUrl, action.params);
        if (data.status == '1') {
          yield put(updateSuccess(data.data.records));
          yield put(updateError('修改成功'));
          const msg = JSON.parse(localStorage.getItem('loginChange') ? localStorage.getItem('loginChange') : localStorage.getItem('login'));
          msg.nickname = action.params.nickName === '' ? msg.nickname : action.params.nickName;
          msg.post = action.params.post === '' ? msg.post : action.params.post;
          msg.company = action.params.company === '' ? msg.company : action.params.company;
          localStorage.setItem('loginChange', JSON.stringify(msg));
        } else {
          yield put(updateError(data.message));
        }
      } catch (e) {
        yield put(updateError(e.message));
      }
    }
  }
}


export default function* watchNoCardCash() {
  yield fork(fetchAccountOverView); // 修改用户信息
}
