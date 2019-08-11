/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-23 13:50:36
 * @LastEditTime: 2019-08-11 10:00:44
 * @LastEditors: Please set LastEditors
 */
/**
 * 数据请求
 */
import 'whatwg-fetch';
import history from 'utils/history';
import {
  RESP_SUCCESS,
  RESP_NOT_LOGIN,
} from 'constants/ResponseCode';

// 默认超时时间
const TIME_OUT = 120000;
// 转换为json
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}
// 校验状态码
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request2(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      const status = error.response ? error.response.status : 500;
      if (status === 404) {
        const err = new Error(status);
        throw err;
      } else {
        const err = new Error('网络错误');
        throw err;
      }
    });
}

/**
 * 构造带超时的请求方法
 * 原理是通过Promise.race 的返回结果以两个 promise 方法执行快的结果为结果
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
 * https://github.com/github/fetch/issues/175
 * http://imweb.io/topic/57c6ea35808fd2fb204eef63
 */
export default function request(url, options, ms = TIME_OUT) {
  const timerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('请求超时，请稍后再试！'));
    }, ms);
  });
  const requestPromise = request2(url, options);
  return Promise.race([timerPromise, requestPromise]);
}

export function requestGet(url, params) {
  return request(url, {
    method: 'GET',
    credentials: 'include', // 强制加入cookie
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function requestPost(url, params, content = 'application/json') {
  // console.log(params);
  return request(url, {
    method: 'POST',
    // mode: 'no-cors',
    credentials: 'include', // 强制加入cookie
    headers: {
      'Accept-Encoding': 'utf-8',
      'Content-Type': content,
      // Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJzcGNiM3giLCJzdWIiOiIxNzMyMTA4NDkwNiIsImV4cCI6MTU2NjAyODkyMywiaWF0IjoxNTY1NDI0MTIzfQ.S2f2iH41bHxLXtmc4ZvWbyhcoRJy_6EA5e9XPFPdTmP0jacKdEW5JFVETfgdOtoMcGj87lcliqJCJiUOJMSLMw',
    },
    body: JSON.stringify(params),
  }).then(res => {
    // 如果 返回的 code 为 1
    if (res && res.resCode === RESP_SUCCESS) {
      return res;
    }
    if (res && res.resCode === RESP_NOT_LOGIN) {
      // history.push('/');
      return res;
    }
    if ((res && res.resCode !== RESP_SUCCESS) || (res && res.resCode !== RESP_NOT_LOGIN)) {
      return res;
    }
    return res;
  });
}
