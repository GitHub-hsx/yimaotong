import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  //  我的点赞
  MY_VIDEOS_SUCCESS,
  MY_VIDEOS_ERROR,
  CLEAR_MY_VIDEOS_LIST,
  TOTAL,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  myVideo: { // 我的视频
    myVideo: [],
  },
  total: '0', // 保存请求回来的数据的总条数
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case POPUP:
    return state.set('tips', false);
  case TOTAL:
    return state.set('total', action.data);
  case CLEAR_MY_VIDEOS_LIST:
    return state.setIn(['myVideo', 'myVideo'], []);
    // 我的点赞
  case MY_VIDEOS_SUCCESS:
    return state.updateIn(['myVideo', 'myVideo'], myVideo => myVideo.concat(action.data));
  case MY_VIDEOS_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
