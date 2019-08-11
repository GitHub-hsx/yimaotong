import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 个人信息修改
  UPDATE_SUCCESS,
  UPDATE_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  update: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case UPDATE_SUCCESS: // 新闻推荐
    return state.set('update', action.data);
  case UPDATE_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case POPUP:
    return state.set('tips', false);
  default:
    return state;
  }
}
export default addAssociateAccount;
