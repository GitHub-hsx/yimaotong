/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-11 12:24:39
 * @LastEditors: Please set LastEditors
 */
import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 发布供应
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 清空数据
  CLEAR_DATA,
  // 数据条数
  TOTAL,
  // 服务器时间
  SERVICE_TIME_SUCCESS,
  SERVICE_TIME_ERROR,
  // 删除或者关闭订单
  CANCEL_SUCCESS,
  CANCEL_ERROR,
  // 合同签署请求
  CONTRACT_SUCCESS,
  CONTRACT_ERROR,
  // 生成订单
  CREATE_SUCCESS,
  CREATE_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  orderList: {
    orderList: [],
  },
  total: '0',
  serviceTime: '',
  cancel: {},
  contract: {}, // 签约合同
  create: {}, // 生成订单
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  // 发布供应
  case CLEAR_DATA:
    return state.setIn(['orderList', 'orderList'], []);
    // 发布供应
  case TOTAL:
    return state.set('total', action.data);
  // 发布供应
  case BUSINESS_SUPPLY_SUCCESS:
    return state.updateIn(['orderList', 'orderList'], orderList => orderList.concat(action.data));
  case BUSINESS_SUPPLY_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 获取服务器时间
  case SERVICE_TIME_SUCCESS:
    return state.set('serviceTime', action.data);
  case SERVICE_TIME_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 取消或者删除订单
  case CANCEL_SUCCESS:
    return state.set('cancel', action.data);
  case CANCEL_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 合同签署请求
  case CONTRACT_SUCCESS:
    return state.set('contract', action.data);
  case CONTRACT_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 合同签署请求
  case CREATE_SUCCESS:
    return state.set('create', action.data);
  case CREATE_ERROR:
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
