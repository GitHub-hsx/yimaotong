/*
 * @Description: 翼知讯个人资料
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-11 02:11:54
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
  // 我的视频
  myVideos,
  clearMyVideos,
} from './redux/actions';
import VideoBlock from '../../UI/VideoBlock'; // 获取视频模块代码


let current = 0;

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: JSON.parse(localStorage.getItem('login')).id,
      pageSize: '12',
      isLoadingMore: false,
    };
  }

  componentDidMount() {
    current = 0;
    this.props.clearMyVideos();
    this.myVideos();
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

  // 视频与客户端交互
  onClickJump = (value, index) => {
    window.Jockey.send('ymt_lookVideo', {
      videoListIndex: current.toString(), // 第几组
      videoIndex: index.toString(), // 第几个视频
      videoList: this.props.video.myVideo.myVideo, // 所有视频数据
      videoFlag: 'me',
    });
  }

  // 我的视频
  myVideos = () => {
    current += 1;
    const message = {
      current: current,
      memberId: this.state.memberId,
      pageSize: this.state.pageSize,
    };
    this.props.myVideos(message);
  }

  loadMoreDataFn = () => {
    if (current * this.state.pageSize < this.props.video.total) {
      this.myVideos();
    }
  }

  render() {
    const {
      myVideo,
    } = this.props.video.myVideo;
    return (
      <div className={Styles.video}>
        <Helmet>
          <title>我的视频</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.videoContainer}>

          {
            myVideo.length > 0 ? myVideo.map((value, index) => <VideoBlock data={value} onClick={() => this.onClickJump(value, index)} />) : ''
          }
        </div>
        <div className={Styles.loadMore} ref="wrapper">
          {
            Number(this.props.video.total) > 10 ? (
              current * this.state.pageSize >= this.props.video.total ? <span>已加载全部</span> : <Spin />
            ) : null
          }
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    myVideos: bindActionCreators(myVideos, dispatch),
    clearMyVideos: bindActionCreators(clearMyVideos, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    video: state.get('video', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'video', reducer });
const withSaga = injectSaga({ key: 'video', saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(Video);
