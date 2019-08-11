import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 评论列表
  NEWS_COMMENT_LIST_SUCCESS,
  NEWS_COMMENT_LIST_ERROR,
  CLEAR_COMMENT_LIST,
  // 新闻点赞
  NEWS_AGREE_SUCCESS,
  NEWS_AGREE_ERROR,
  // 新增评论
  NEWS_COMMENT_ADD_SUCCESS,
  NEWS_COMMENT_ADD_ERROR,
  // 收藏
  NEWS_COLLECT_SUCCESS,
  NEWS_COLLECT_ERROR,
  // 评论总条数
  TOTAL,
  // 获取新闻详情
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_ERROR,
  // 新闻相关操作
  NEWS_RELATIVE_SUCCESS,
  NEWS_RELATIVE_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  list: {
    list: [],
  },
  agree: {},
  comment: {},
  collect: {},
  total: '0',
  detail: {
    title: '',
    description: '',
    content: '',
  },
  options: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case POPUP:
    return state.set('tips', false);
    // 获取新问相关的操作
  case NEWS_RELATIVE_SUCCESS:
    return state.set('options', action.data);
  case NEWS_RELATIVE_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 获取新闻详情
  case NEWS_DETAILS_SUCCESS:
    return state.set('detail', action.data);
  case NEWS_DETAILS_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 评论列表
  case NEWS_COMMENT_LIST_SUCCESS:
    return state.updateIn(['list', 'list'], list => list.concat(action.data));
  case NEWS_COMMENT_LIST_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case CLEAR_COMMENT_LIST:
    return state.setIn(['list', 'list'], []);
  // 新闻点赞
  case NEWS_AGREE_SUCCESS:
    return state.set('agree', action.data);
  case NEWS_AGREE_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 新闻评论
  case NEWS_COMMENT_ADD_SUCCESS:
    return state.set('comment', action.data);
  case NEWS_COMMENT_ADD_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 新闻收藏
  case NEWS_COLLECT_SUCCESS:
    return state.set('collect', action.data);
  case NEWS_COLLECT_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  // 新闻收藏
  case TOTAL:
    return state.set('total', action.data);
  default:
    return state;
  }
}
export default addAssociateAccount;
