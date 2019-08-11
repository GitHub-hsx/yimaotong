import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 订单评价
  EVALUATE_SUCCESS,
  EVALUATE_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  evaluate: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  // 订单评价
  case EVALUATE_SUCCESS:
    return state.set('evaluate', action.data);
  case EVALUATE_ERROR:
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
