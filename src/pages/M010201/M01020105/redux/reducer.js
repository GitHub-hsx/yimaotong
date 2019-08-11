import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  MY_COMMENTS_SUCCESS,
  MY_COMMENTS_ERROR,
  CLEAR_MY_COMMENTS_LIST,
  TOTAL,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  myComment: { // 我的视频
    myComment: [],
  },
  total: '0', // 保存请求回来的数据的总条数
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case POPUP:
    return state.set('tips', false);
  case TOTAL:
    return state.set('total', action.data);
  case CLEAR_MY_COMMENTS_LIST:
    return state.setIn(['myComment', 'myComment'], []);
    // 我的点赞
  case MY_COMMENTS_SUCCESS:
    return state.updateIn(['myComment', 'myComment'], myComment => myComment.concat(action.data));
  case MY_COMMENTS_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
