import { fromJS } from 'immutable';
import {
  ADD_ASSOCIATE_ACCOUNT_SUCCESS,
  ADD_ASSOCIATE_ACCOUNT_ERROR,
  // 接口弹窗报错
  POPUP,
} from './constants';
export const initialState = fromJS({
  tips: false,
  errorMsg: {},
  list: {
    records: [],
  },
});

function addAssociateAccount(state = initialState, action) {
  switch (action.type) {
  case ADD_ASSOCIATE_ACCOUNT_SUCCESS:
    return state.set('list', action.data);
  case ADD_ASSOCIATE_ACCOUNT_ERROR:
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
