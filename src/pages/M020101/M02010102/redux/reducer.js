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
  // 累计成交量
  TRANS_ACTION_TOTAL_SUCCESS,
  TRANS_ACTION_TOTAL_ERROR,
  // 气质报告
  GAS_REPORT_SUCCESS,
  GAS_REPORT_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  detail: {
  },
  pic: [],

  list: {
    list: [],
  },
  total: '0',
  // 累计成交量
  sum: {},
  realTime: {
    realTime: {},
  },
  gasReport: {}, // 气质报告
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
    return state.setIn(['realTime', 'realTime'], action.data);
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
  default:
    return state;
  }
}
export default addAssociateAccount;
