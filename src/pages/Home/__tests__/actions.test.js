import {
  CHANGE_USERNAME,
  GET_API_DATA_BASE,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
 } from '../redux/constants';

import {
  changeUsername,
  getApiBase,
  getDataSuccess,
  getDataError,
} from '../redux/actions';

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('需要返回正确的值', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_USERNAME,
        name: fixture,
      };
      expect(changeUsername(fixture)).toEqual(expectedResult);
    });
  });
  describe('getApiBase',() => {
    it('should turn the correct type and the passed params', () => {
      const params = 'Max';
      const expectedResult = {
        type: GET_API_DATA_BASE,
        params: params,
      };
      expect(getApiBase(params)).toEqual(expectedResult);
    });
  });
  describe('getDataSuccess', () => {
    it('获取数据成功后需要保存数据',()=>{
      const data = {

      };
      const expectedResult = {
        type: GET_DATA_SUCCESS,
        data: data,
      };
      expect(getDataSuccess(data)).toEqual(expectedResult);
    });
  });
  describe('getDataError', ()=>{
    it('获取数据失败后需要' ,()=>{
      const data = {

      };
      const expectedResult = {
        type: GET_DATA_ERROR,
        data: data,
      };
      expect(getDataError(data)).toEqual(expectedResult);
    })
  })
});
