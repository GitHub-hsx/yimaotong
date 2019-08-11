/*
 * @Description: 翼知讯个人资料
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-06 23:43:30
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
  PullToRefresh,
  ListView,
  Button,
  SegmentedControl,
} from 'antd-mobile';
import { requestPost } from 'utils/request';
import {
  Spin,
} from 'components';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import Styles from './style.less';
import {
  // 我的评论
  myComment,
  clearMyComment,
} from './redux/actions';
import {
  cmb,
} from '../../../assets/picture.js';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

let current;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: '20',
      memberId: this.props.global.phoneData.id,
      isLoadingMore: false,
    };
  }

  componentDidMount() {
    current = 0;
    this.props.clearMyComment();
    this.myComment();
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

  // 请求我的评论接口
  myComment = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
      memberId: this.state.memberId,
    };
    this.props.myComment(message);
  }

  loadMoreDataFn = () => {
    if (current * this.state.pageSize < this.props.comment.total) {
      this.myComment();
    }
  }

  renderComment(value, index) {
    const photo = {
      backgroundImage: 'url(' + value.pic_path + ')', // 头像图片
    };
    const video = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + value.thumb_pic + ')', // 视频图片
    };
    return (
      <div className={Styles.list}>
        <div className={Styles.message}>
          <div className={Styles.photo}>
            <div style={photo} />
            {/* <img src={cmb} alt="" /> */}
          </div>
          <div className={Styles.describe}>
            <div className={Styles.name}>{value.nickname}</div>
            <div className={Styles.comments}>{value.comments}</div>
            <div className={Styles.haveALike}>评论了你的作品</div>
            <div className={Styles.time}>{value.timei}</div>
          </div>
        </div>
        <div className={Styles.video}>
          <div style={video} />
          {/* <img src={cmb} alt="" /> */}
        </div>
      </div>
    );
  }

  render() {
    const list = this.props.comment.myComment.myComment;
    return (
      <div className={Styles.comment}>
        <Helmet>
          <title>评论</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WingBlank size="xs">
          {
            list.length > 0 ? list.map((value, index) => this.renderComment(value, index)) : ''
          }
          <div className={Styles.loadMore} ref="wrapper">
            {
              Number(this.props.comment.total) > 10 ? (
                current * this.state.pageSize >= this.props.comment.total ? <span>已加载全部</span> : <Spin />
              ) : null
            }
          </div>
        </WingBlank>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
  // 我的评论
    myComment: bindActionCreators(myComment, dispatch),
    clearMyComment: bindActionCreators(clearMyComment, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    comment: state.get('comment', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'comment', reducer });
const withSaga = injectSaga({ key: 'comment', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Comment);
