/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-23 13:50:36
 * @LastEditTime: 2019-08-11 00:37:45
 * @LastEditors: Please set LastEditors
 */

import { requestPost } from 'utils/request';
import ApiConfig from 'constants/ApiConfig';

// 手机号脱敏
export function desensitizationTel(telephone) {
  const str1 = telephone.substring(0, 3);
  const str2 = telephone.substring(telephone.length - 4);
  return str1 + '****' + str2;
}

// 身份证号脱敏
export function desCertificateNo(telephone) {
  const str1 = telephone.substring(0, 4);
  const str2 = telephone.substring(telephone.length - 4);
  return str1 + '****' + str2;
}

// 金额格式化
export function formaMoney(money) {
  const str = (money / 1).toFixed(2) + '';
  const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');
  const dot = str.substring(str.length, str.indexOf('.'));
  const ret = intSum + dot;
  return ret;
}

// 其他证件号脱敏第二种
export function otherfivecateNo(otherfivecateNos) {
  const str1 = otherfivecateNos.substring(0, 0);
  const str2 = otherfivecateNos.substring(otherfivecateNos.length - 2);
  return str1 + '****' + str2;
}

// 其他证件号脱敏
export function othercateNo(otherNo) {
  const str1 = otherNo.substring(0, 1);
  const str2 = otherNo.substring(otherNo.length - 3);
  return str1 + '****' + str2;
}

// 与服务端交互公共方法
export function getBook(data, params = {}) {
  return new Promise((resolve, reject) => {
    if (window.Jockey) {
      window.Jockey.send(data, params, (res) => {
        resolve(res);
      });
    }
  });
}


// 获取 seq 的方法 异步转promise写法
export function getSeq(params = {}) {
  return new Promise((resolve, reject) => {
    if (window.Jockey) {
      window.Jockey.send('seq', params, (seq) => {
        resolve(seq);
      });
    }
  });
}

// 获取 token 的方法 异步转promise写法
export function getToken(params = {}) {
  return new Promise((resolve, reject) => {
    if (window.Jockey) {
      window.Jockey.send('token', params, (res) => {
        resolve(res);
      });
    }
  });
}


/**
 * 调用验证密码弹窗
 *verifyPassword 交易密码验证弹窗(type)
 *tradePassword 验证码（type)
 *otpBankCheck  动态令牌（非必须）
 *smsBankCheck  短信验证（非必须
 *sms 短信模板
 *mode 传给客户端的数据
 *
     const mode = {
      SERVICE_CODE: 'S030500', // 模块编码
      payAcNo: desensitization(this.state.payerAcNo.replace(/\s/ig, '')), // 需要显示在弹窗上的数据
      receiptAcNo: desensitization(obj[this.state.index].accountNo),
      amount: '￥' + formaMoney(this.state.amount),
    };
 */
export function getTradePassword(type, sms = {}, mode = {}, smsBankCheck = '', otpBankCheck = '', isOutLogin = '') {
  return new Promise(((resolve, reject) => {
    window.Jockey.send(type, {
      flag: 'passwordPopup',
      smsBankCheck: smsBankCheck,
      otpBankCheck: otpBankCheck,
      sms,
      mode,
      isOutLogin: isOutLogin,
    },
    (tradePassword) => {
      resolve(tradePassword);
    });
  }));
}


// 调用验证密码弹窗
export function closeTradePassword() {
  window.Jockey.send('shutDown', {
    flag: 'passwordPopup',
  });
}


// 悠悦宝
export function getBooks(params = {}) {
  return new Promise((resolve, reject) => {
    if (window.Jockey) {
      window.Jockey.send('book', params, (indexDT10) => {
        resolve(indexDT10);
      });
    }
  });
}

/**
 * 验收收付账号是否列入黑灰名单
 * @param {object} params
 * @return {Boolean} 返回 true 或 false
 * 判断 warnFlag 0-白名单 1-黑灰名单
 */

// params = {
//   head: {
//     deviceId: '',
//     deviceType: '',
//     osType: '',
//     seq: '',
//     sessionID: '',
//     softVersion: '',
//     type: '',
//   },
//   message: {
//     functionId: '',
//     payAccountNo: '',
//     receiptAccountNo: '',
//     receiptDeptId: '',
//   },
// }
export function validateBlackWhiteList(params = {}) {
  return new Promise((resolve, reject) => {
    requestPost(ApiConfig.HOST_NAME_BASE_URL, params)
      .then(res => {
        if (res.warnFlag === '0') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}

// type = loading_Local  半锁
// type = loading_Global 全锁
// flag = begin 开
// flag = end   关
// type 状态， flag 锁屏方式
export function loading(flag = 'begin', type = 'loading_Local') {
  if (window.Jockey) {
    window.Jockey.send(type, {
      flag: flag,
    });
  }
}
// 倒计时
export function countDown(serviceTime, time, haveTime) {
  time = '2019-08-11 00:30:00';
  // alert(serviceTime);
  const endTime = new Date(time.replace(/\-/g, '/'));
  const service = new Date(serviceTime.replace(/\-/g, '/'));
  let last = parseInt(endTime - service) + 30 * 60 * 1000;
  let clock = '';
  // const timer = setInterval(() => {
    last -= 1000;
    const min = last / 1000 / 60 >= 1 ? Math.floor(last / 1000 / 60) : '00';
    const sec = last - min * 1000 * 60;
    const second = Math.floor(sec / 1000);
    clock = min + ':' + second;
  //   if (min == 0) {
  //     clearInterval(timer);
  //   }
  //   haveTime(clock);
  // }, 1000);
}
