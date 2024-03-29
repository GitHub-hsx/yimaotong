/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
  GET_DATA_SUCCESS,
  GET_API_DATA_BASE,
  GET_DATA_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  data: '',
  errMsg: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
  case CHANGE_USERNAME:
    // Delete prefixed '@' from the github username
    return state.set('username', action.name.replace(/@/gi, ''));
  case GET_DATA_SUCCESS:
    if (action.data.resCode === '1') {
      const newState = state.set('data', action.data.message);
      return newState;
    }
    return state;
  case GET_DATA_ERROR:
    return state.set('errMsg', action.data);
  default:
    return state;
  }
}

export default homeReducer;
