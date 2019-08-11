/*
 * @Description: 翼知讯（行情）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-05 23:44:17
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


class Setting extends Component {
// 退出登录
outLogin = () => {
  window.Jockey.send('ymt_logout', {});
}

// 协议
onClickJump = (value) => {
  this.props.history.push({
    pathname: '/M010201/08',
    index: value,
  });
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
        <List className="my-list">
          <Item style={{ height: '50px' }} arrow="horizontal" onClick={() => this.onClickJump('1')}>隐私政策</Item>
          <Item style={{ height: '50px' }} arrow="horizontal" onClick={() => this.onClickJump('2')}>服务协议</Item>
          <Item style={{ height: '50px' }} arrow="horizontal" onClick={() => this.onClickJump('3')}>关于</Item>
        </List>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank>
        <Button type="primary" style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.outLogin}>退出登录</Button>
      </WingBlank>
    </div>
  );
}
}

export default (Setting);
