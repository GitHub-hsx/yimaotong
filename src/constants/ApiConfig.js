/**
 * 所有接口格式定义
 */

// 根据环境变量设置接口路径 具体设置在config目录下的各个环境
const BASE_API = process.env.BASE_API + '/article-gate' || 'http://192.168.1.66:9000';
const BASE_API_MEMBER = process.env.BASE_API + '/member-gate'; // 会员系统
const IMG_API = 'http://s.lng168.com';// 服务器图片地址
// const IMG_API = 'http://yzx2.lng168.com';// 服务器图片地址
export default {

  // 基础接口
  HOST_NAME_BASE_URL: window.YIZHIXUN_API_URL || BASE_API,
  IMG_NAME_BASE_URL: window.YIZHIXUN_API_URL || IMG_API,
  BASE_API_MEMBER: window.YIZHIXUN_API_URL || BASE_API_MEMBER,
};
