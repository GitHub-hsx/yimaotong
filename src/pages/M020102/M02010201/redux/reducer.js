import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 发布供应
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 最新供应
  NEW_SUPPLY_SUCCESS,
  NEW_SUPPLY_ERROR,
  // 最新需求
  NEW_PURCHASE_SUCCESS,
  NEW_PURCHASE_ERROR,
  // 数据操作
  TOTAL,
  CLEAR_LIST,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  list: {
    list: [],
  },
  total: '0',
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  // 数据操作
  case TOTAL:
    return state
      .set('total', action.data);
  case CLEAR_LIST:
    return state
      .setIn(['list', 'list'], []);
  // 我的发布
  case BUSINESS_SUPPLY_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case BUSINESS_SUPPLY_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 最新供应
  case NEW_SUPPLY_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case NEW_SUPPLY_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 最新需求
  case NEW_PURCHASE_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case NEW_PURCHASE_ERROR:
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
