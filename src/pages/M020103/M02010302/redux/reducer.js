import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 发布供应
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  purchase: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  // 发布供应
  case BUSINESS_SUPPLY_SUCCESS:
    return state.set('purchase', action.data);
  case BUSINESS_SUPPLY_ERROR:
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
