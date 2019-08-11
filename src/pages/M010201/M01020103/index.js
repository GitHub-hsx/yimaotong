/*
 * @Description: 翼知讯个人资料
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-04 23:21:23
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import {
  WhiteSpace,
  WingBlank,
  Button,
} from 'antd-mobile';
import { requestPost } from 'utils/request';
import {
  Spin,
  Verification,
} from 'components';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import Styles from './style.less';
import {
  // 我的点赞
  videoMyThumbs,
  clearMyThumbs,
  popup, // 弹窗控制
} from './redux/actions';
import {
  cmb,
} from '../../../assets/picture.js';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

let current = 0;

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      isLoadingMore: false,
      memberId: this.props.global.phoneData.id,
    };
  }

  componentDidMount() {
    current = 0;
    this.props.clearMyThumbs();
    this.videoMyThumbs();
    const wrapper = this.refs.wrapper;
    const that = this; // 为解决不同context的问题
    let timeCount;


    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      const windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        that.loadMoreDataFn();
      }
    }


    window.addEventListener('scroll', () => {
      if (this.state.isLoadingMore) {
        return;
      }

      if (timeCount) {
        clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }, false);
  }

  loadMoreDataFn = () => {
    if (current * this.state.pageSize < this.props.like.total) {
      this.videoMyThumbs();
    }
  }

  // 关闭弹窗
  onClickClosePopUp = () => {
    this.props.popup();
  }


  // 请求接口获取新闻
  videoMyThumbs = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
      memberId: this.state.memberId,
    };
    this.props.videoMyThumbs(message);
  }

  renderList(value, index) {
    const photo = {
      backgroundImage: 'url(' + value.pic_path + ')', // 头像图片
    };
    const video = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + value.thumb_pic + ')', // 视频图片
    };
    return (
      <div className={Styles.list} key={index}>
        <div className={Styles.message}>
          <div className={Styles.photo}>
            <div style={photo} />
          </div>
          <div className={Styles.describe}>
            <div className={Styles.name}>{value.nickname}</div>
            <div className={Styles.haveALike}>赞了你的作品</div>
            <div className={Styles.time}>{value.visit_time}</div>
          </div>
        </div>
        <div className={Styles.video}>
          <div style={video} />
        </div>
      </div>
    );
  }

  render() {
    const {
      myThumbs,
    } = this.props.like.myThumbs;
    return (
      <div className={Styles.like}>
        <Helmet>
          <title>点赞</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WingBlank size="xs">
          {
            myThumbs.length > 0 ? myThumbs.map((value, index) => this.renderList(value, index)) : ''
          }
          <div className={Styles.loadMore} ref="wrapper">
            {
              Number(this.props.like.total) > 10 ? (
                current * this.state.pageSize >= this.props.like.total ? <span>已加载全部</span> : <Spin />
              ) : null
            }
          </div>
        </WingBlank>
        {
          this.props.like.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.like.errorMsg}
              </Verification>
            )
            : null
        }
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 我的点赞
    videoMyThumbs: bindActionCreators(videoMyThumbs, dispatch),
    // 清空请求回来的点赞数据
    clearMyThumbs: bindActionCreators(clearMyThumbs, dispatch),
    // 弹窗控制
    popup: bindActionCreators(popup, dispatch),

  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    like: state.get('like', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'like', reducer });
const withSaga = injectSaga({ key: 'like', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Like);
