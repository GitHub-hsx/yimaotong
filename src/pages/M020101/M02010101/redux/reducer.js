/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-14 18:18:58
 * @LastEditTime: 2019-08-10 15:47:23
 * @LastEditors: Please set LastEditors
 */
import { fromJS } from 'immutable';
import {
  // 轮播图
  BANNER_SUCCESS,
  BANNER_ERROR,
  // 接口弹窗报错
  POPUP,
  // 实时消息详情
  REAL_TIME_MESSAGE_SUCCESS,
  REAL_TIME_MESSAGE_ERROR,
  // 数据操作
  TOTAL,
  CLEAR_LIST,
  // 累计成交量
  TRANS_ACTION_TOTAL_SUCCESS,
  TRANS_ACTION_TOTAL_ERROR,
  // 气质报告
  GAS_REPORT_SUCCESS,
  GAS_REPORT_ERROR,
  // 企业认证
  ENT_AUTH_SUCCESS,
  ENT_AUTH_ERROR,
  // 企业实名认证
  QUERY_AUTH_SUCCESS,
  QUERY_AUTH_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  detail: {
  },
  pic: [],
  total: '0',
  // 累计成交量
  sum: {
    totalAmount: '0',
    totalNum: '0',
  },
  realTime: {
    realTime: [],
  },
  gasReport: {}, // 气质报告
  entAuth: {},
  query: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case BANNER_SUCCESS:
    return state.set('pic', action.data);
  case BANNER_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case POPUP:
    return state.set('tips', false);
    // 实时消息详情查询
  case REAL_TIME_MESSAGE_SUCCESS:
    return state.updateIn(['realTime', 'realTime'], realTime => realTime.concat(action.data));
  case REAL_TIME_MESSAGE_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 数据操作
  case TOTAL:
    return state
      .set('total', action.data);
  case CLEAR_LIST:
    return state
      .setIn(['realTime', 'realTime'], []);
    // 累计成交量
  case TRANS_ACTION_TOTAL_SUCCESS:
    return state.set('sum', action.data);
  case TRANS_ACTION_TOTAL_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 气质报告
  case GAS_REPORT_SUCCESS:
    return state.set('gasReport', action.data);
  case GAS_REPORT_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 企业认证
  case ENT_AUTH_SUCCESS:
    return state.set('entAuth', action.data);
  case ENT_AUTH_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 企业实名认证
  case QUERY_AUTH_SUCCESS:
    return state.set('query', action.data);
  case QUERY_AUTH_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
