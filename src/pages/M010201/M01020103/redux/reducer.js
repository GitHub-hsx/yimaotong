import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  //  我的点赞
  VIDEO_MY_THUMBS_SUCCESS,
  VIDEO_MY_THUMBS_ERROR,
  CLEAR_MY_THUMBS_LIST,
  // 数据总条数
  TOTAL,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  myThumbs: {
    myThumbs: [], // 我的点赞
  },
  total: '0',
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case POPUP:
    return state.set('tips', false);
  case TOTAL:
    return state.set('total', action.data);
    // 清空请求回来的点赞数据
  case CLEAR_MY_THUMBS_LIST:
    return state.setIn(['myThumbs', ' myThumbs'], []);
    // 我的点赞
  case VIDEO_MY_THUMBS_SUCCESS:
    return state.updateIn(['myThumbs', 'myThumbs'], myThumbs => myThumbs.concat(action.data));
  case VIDEO_MY_THUMBS_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
