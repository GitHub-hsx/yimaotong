/*
 * @Description: 翼知讯我的
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-10 14:13:02
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import history from 'utils/history';
import { compose, bindActionCreators } from 'redux';
import ApiConfig from 'constants/ApiConfig';
import { List, WingBlank } from 'antd-mobile';
import {
  BottomBar,
} from 'components';
import Styles from './style.less';

import {
  noPhoto,
  arrow,
  iconAgree,
  iconVideo,
  iconComment,
  iconCollect,
  iconSetting,
} from '../../../assets/picture.js';
const Item = List.Item;
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;

class PersonalMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  // 跳转个人资料
  onClickDetailMessage = () => {
    history.push('/M010201/02');
  }

  // 跳转至点赞
  onClickJumpToLike = () => {
    history.push('/M010201/03');
  }

  // 视频
  onClickJumpToVideo = () => {
    history.push('/M010201/04');
  }

  // 评论
  onClickJumpToComment = () => {
    history.push('/M010201/05');
  }

  // 收藏
  onClickJumpToCollect = () => {
    history.push('/M010201/06');
  }

  // 设置
  onClickJumpToSetting = () => {
    history.push('/M010201/07');
  }

  render() {
    const msg = JSON.parse(localStorage.getItem('loginChange') ? localStorage.getItem('loginChange') : localStorage.getItem('login'));
    const customMSg = msg.picPath ? msg.picPath : '';
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
    // const msg = this.props.global.phoneData;
    return (
      <div className={Styles.personalMessage}>
        <Helmet>
          <title>我的</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.personal}>
          <div className={Styles.photo}>
            <div className={Styles.bgPhoto} style={bgPhoto} />
          </div>
          <div className={Styles.introduction} onClick={this.onClickDetailMessage}>
            <div className={Styles.basic}>
              <div className={Styles.name}>{msg.nickname + ' ' + msg.mobile.substring(msg.mobile.length - 4, msg.mobile.length)}</div>
              <div className={Styles.company}>&nbsp;{msg.company !== '' ? msg.company : '保密'}</div>
              <div className={Styles.job}>&nbsp;{msg.post === '' ? '保密' : msg.post}</div>
            </div>
            <div className={Styles.arrow}>
              <WingBlank>
                <img src={arrow} alt="" />
              </WingBlank>
            </div>
          </div>
        </div>
        <List className="my-list">
          <Item thumb={iconAgree} arrow="horizontal" onClick={this.onClickJumpToLike}>点赞</Item>
          <Item thumb={iconVideo} arrow="horizontal" onClick={this.onClickJumpToVideo}>视频</Item>
          <Item thumb={iconComment} arrow="horizontal" onClick={this.onClickJumpToComment}>评论</Item>
          <Item thumb={iconCollect} arrow="horizontal" onClick={this.onClickJumpToCollect}>收藏</Item>
          <Item thumb={iconSetting} arrow="horizontal" onClick={this.onClickJumpToSetting}>设置</Item>
        </List>
        <BottomBar
          onChange={this.changeTab}
        />
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
)(PersonalMessage);
