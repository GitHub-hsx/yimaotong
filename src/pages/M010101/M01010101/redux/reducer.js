import { fromJS } from 'immutable';
import {
  ADD_ASSOCIATE_ACCOUNT_SUCCESS,
  ADD_ASSOCIATE_ACCOUNT_ERROR,
  // 接口弹窗报错
  POPUP,
  // 实时消息详情
  REAL_TIME_MESSAGE_SUCCESS,
  REAL_TIME_MESSAGE_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  detail: {
  },
  list: [],
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case ADD_ASSOCIATE_ACCOUNT_SUCCESS:
    return state.set('list', action.data);
  case ADD_ASSOCIATE_ACCOUNT_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case POPUP:
    return state.set('tips', false);
    // 实时消息详情查询
  case REAL_TIME_MESSAGE_SUCCESS:
    return state.set('detail', action.data);
  case REAL_TIME_MESSAGE_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
