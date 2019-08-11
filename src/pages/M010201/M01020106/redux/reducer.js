import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 资讯收藏
  NEWS_MY_COLLECTION_SUCCESS,
  NEWS_MY_COLLECTION_ERROR,
  CLEAR_NEWS,
  //  视频收藏
  VIDEO_MY_COLLECTION_SUCCESS,
  VIDEO_MY_COLLECTION_ERROR,
  CLEAR_VIDEO,
  TOTAL,
  // 获取新闻详情
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  video: {
    video: [],
  },
  news: {
    news: [],
  },
  data: '0',
  detail: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case POPUP:
    return state.set('tips', false);
  // 获取新闻详情
  case NEWS_DETAILS_SUCCESS:
    return state.set('detail', action.data);
  case NEWS_DETAILS_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
    // 资讯收藏
  case NEWS_MY_COLLECTION_SUCCESS:
    return state.updateIn(['news', 'news'], news => news.concat(action.data));
  case NEWS_MY_COLLECTION_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case CLEAR_NEWS:
    return state.setIn(['news', 'news'], []);
    // 视频收藏
  case VIDEO_MY_COLLECTION_SUCCESS:
    return state.updateIn(['video', 'video'], news => news.concat(action.data));
  case VIDEO_MY_COLLECTION_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case CLEAR_VIDEO:
    return state.setIn(['video', 'video'], []);
  // 数据总数
  case TOTAL:
    return state.set('data', action.data);
  default:
    return state;
  }
}
export default addAssociateAccount;
