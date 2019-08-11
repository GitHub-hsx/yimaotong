import { fromJS } from 'immutable';
import {
  ADD_ASSOCIATE_ACCOUNT_SUCCESS,
  ADD_ASSOCIATE_ACCOUNT_ERROR,
  CLEAR_NEWS_LIST, // 清空新闻列表
  // 接口弹窗报错
  POPUP,
  // 获取新闻详情
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_ERROR,
  // 行情分页接口查询
  SITUATION_LIST_SUCCESS,
  SITUATION_LIST_ERROR,
  // 请求新闻的总数
  TOTAL,
  // 视频列表请求
  VIDEO_SUCCESS,
  VIDEO_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  list: {
    list: [],
  },
  detail: {},
  data: '0',
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case ADD_ASSOCIATE_ACCOUNT_SUCCESS: // 新闻推荐
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case ADD_ASSOCIATE_ACCOUNT_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case CLEAR_NEWS_LIST:
    return state
      .setIn(['list', 'list'], []);
  case POPUP:
    return state.set('tips', false);
    // 获取新闻详情
  case NEWS_DETAILS_SUCCESS:
    return state.set('detail', action.data);
  case NEWS_DETAILS_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 获取行情列表
  case SITUATION_LIST_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case SITUATION_LIST_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 获取行情列表
  case TOTAL:
    return state.set('data', action.data);
    // 视频列表
  case VIDEO_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case VIDEO_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
