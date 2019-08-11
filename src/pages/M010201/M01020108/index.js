/*
 * @Description: 翼知讯（行情）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-05 23:43:41
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  WhiteSpace, Button, List, WingBlank,
} from 'antd-mobile';
import {
  TitleDisplay,
  BottomBar,
} from 'components';
import Styles from './style.less';
const Item = List.Item;


class Protocol extends Component {
// 退出登录
outLogin = () => {
  window.Jockey.send('ymt_logout', {});
}

render() {
  return (
    <div className={Styles.setting}>
      <Helmet>
        <title>设置</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className={Styles.content}>
        这是协议
      </div>
    </div>
  );
}
}

export default (Protocol);
