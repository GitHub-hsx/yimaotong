/*
 * @Description: 翼知讯个人资料
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-06 22:30:00
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { List, WingBlank } from 'antd-mobile';
import ApiConfig from 'constants/ApiConfig';
import Styles from './style.less';
import {
  noPhoto,
} from '../../../assets/picture.js';
const Item = List.Item;
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;


class DetailMessage extends Component {
  jumpTo = (value) => {
    this.props.history.push({
      pathname: '/M010201/09',
      index: value,
    });
  }

  render() {
    const customMSg = this.props.global.phoneData.picPath ? this.props.global.phoneData.picPath : '';
    let photo = '';
    if (customMSg === '') {
      photo = noPhoto;
    } else if (customMSg.substring(0, 4) == 'http') {
      photo = customMSg;
    } else {
      photo = IMG_NAME_BASE_URL + customMSg;
    }
    const bgPhoto = {
      backgroundImage: 'url(' + photo + ')',
    };
    return (
      <div className={Styles.detailMessage}>
        <Helmet>
          <title>个人信息</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WingBlank>
          <div className={Styles.name}>
            <div>头像</div>
            <div className={Styles.photo}>
              <div className={Styles.bgPhoto} style={bgPhoto} />
            </div>
          </div>
        </WingBlank>
        <List className="my-list">
          <Item style={{ height: '50px' }} arrow="horizontal" onClick={() => this.jumpTo('1')}>姓名</Item>
          <Item style={{ height: '50px' }} arrow="horizontal" onClick={() => this.jumpTo('2')}>所属公司</Item>
          <Item style={{ height: '50px' }} arrow="horizontal" onClick={() => this.jumpTo('3')}>职务</Item>
        </List>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(DetailMessage);
