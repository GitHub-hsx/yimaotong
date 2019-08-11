
import {
  CHANGE_USERNAME,
  GET_API_DATA_BASE,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from './constants';
/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function getApiBase(params) {
  return {
    type: GET_API_DATA_BASE,
    params,
  };
}
export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  };
}

export function getDataError(data) {
  return {
    type: GET_DATA_ERROR,
    data,
  };
}
