import { fromJS } from 'immutable';
import {
  // 接口弹窗报错
  POPUP,
  // 发布供应
  BUSINESS_SUPPLY_SUCCESS,
  BUSINESS_SUPPLY_ERROR,
  // 图片批量上传
  BATCH_UPLOAD_SUCCESS,
  BATCH_UPLOAD_ERROR,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  supply: {},
  pic: {},
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  // 发布供应
  case BUSINESS_SUPPLY_SUCCESS:
    return state.set('supply', action.data);
  case BUSINESS_SUPPLY_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  case POPUP:
    return state.set('tips', false);
    // 图片批量上传
  case BATCH_UPLOAD_SUCCESS:
    return state.set('pic', action.data);
  case BATCH_UPLOAD_ERROR:
    return state
      .set('errorMsg', action.data)
      .set('tips', true);
  default:
    return state;
  }
}
export default addAssociateAccount;
