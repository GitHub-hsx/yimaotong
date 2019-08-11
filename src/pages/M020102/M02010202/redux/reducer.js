/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 17:37:28
 * @LastEditTime: 2019-08-11 21:19:54
 * @LastEditors: Please set LastEditors
 */
import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 发布供应
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 企业综合评价
  OVERAL_EVALUATE_SUCCESS,
  OVERAL_EVALUATE_ERROR,
  // 清楚store中的list数据
  CLEAR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  list: {
    list: [],
  },
  access: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  // 清楚list中的数据
  case CLEAR:
    return state.setIn(['list', 'list'], []);

  // 评价列表
  case BUSINESS_SUPPLY_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case BUSINESS_SUPPLY_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 企业综合评价
  case OVERAL_EVALUATE_SUCCESS:
    return state.set('access', action.data);
  case OVERAL_EVALUATE_ERROR:
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
