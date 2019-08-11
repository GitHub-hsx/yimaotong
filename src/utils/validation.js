/**
 *正则校验表
 */
/* eslint-disable no-useless-escape */
export const regObj = {
  // 短信
  SmsCode: /^\d{6}$/,
  // 密码正则
  Password: /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}/,
  // 手机号正则
  Mobile: /^[1][34578][0-9]{9}$/,
  // 真实姓名正则
  RealName: /^[\u4e00-\u9fa5 ]{2,10}$/,
  // 银行卡号正则
  BankNum: /^\d{10,19}$/,
  // 邮件正则
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

};
/* eslint-enable no-useless-escape */
