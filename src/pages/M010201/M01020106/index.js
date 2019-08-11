/*
 * @Description: 翼知讯个人资料
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-11 13:11:42
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
} from 'antd-mobile';
import {
  TitleDisplay,
  Tabs,
  Spin,
} from 'components';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import Styles from './style.less';
import {
  // 资讯收藏
  newsMyCollection,
  // 视频收藏
  videoMyCollect,
  // 资讯详情
  getNewsDetails,
} from './redux/actions';
import {
  heart,
} from '../../../assets/picture.js';
import NewsBlock from '../../UI/NewsBlock'; // 获取新闻模块代码
import VideoBlock from '../../UI/VideoBlock'; // 获取视频模块代码
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
let current = 0;
let vNum = 0;

class Collect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0, // 页签索引
      memberId: this.props.global.phoneData.id, // 客户号
      pageSize: 20, // 每页显示数
      isLoadingMore: false,
      newsLoading: true,
      videoLoading: true,
    };
  }

  componentDidMount() {
    current = 0;
    vNum = 0;
    if (this.props.collect.news.news.length === 0) {
      this.newsMyCollection();
    }
    const wrapper = this.refs.wrapper;
    // const loadMoreDataFn = this.loadMoreDataFn;
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

  // 资讯收藏
  newsMyCollection = () => {
    current += 1;
    const message = {
      current: current,
      memberId: Number(this.state.memberId),
      pageSize: this.state.pageSize,
    };
    this.props.newsMyCollection(message);
  }

  // 视频收藏
  videoMyCollect = () => {
    vNum += 1;
    const message = {
      current: vNum,
      memberId: this.state.memberId,
      pageSize: this.state.pageSize,
    };
    this.props.videoMyCollect(message);
  }

  // 页签切换事件
  changeTab = (e, index) => {
    this.setState({
      tab: index,
    });
    if (index === 0 && this.props.collect.news.news.length === 0) {
      this.newsMyCollection();
    } else {
      this.videoMyCollect();
    }
  }


  loadMoreDataFn = () => {
    if (current * this.state.pageSize < Number(this.props.collect.data)) {
      if (this.state.tab === 0) {
        this.newsMyCollection();
      } else {
        this.videoMyCollect();
      }
    }
  }

  // 资讯跳转至详情页
  onClickJumpNew = (value) => {
    this.props.history.push('/M010102/02');
    localStorage.setItem('id', value.id);
    // const message = {
    //   id: value.id,
    // };
    // this.props.getNewsDetails(message);
  }

  render() {
    console.log(this.props.collect);
    const {
      news,
    } = this.props.collect.news;
    const {
      video,
    } = this.props.collect.video;
    const total = this.props.collect.data;
    return (
      <div className={Styles.collect}>
        <Helmet>
          <title>收藏</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.tab}>
          <Tabs values={['资讯', '视频']} onChange={this.changeTab} selectedIndex={this.state.tab} />
        </div>
        {
          this.state.tab === 0
            ? (
              <div className={Styles.App}>
                <NewsBlock data={news} pic="pic_url" onClickJumpNew={this.onClickJumpNew} />
              </div>
            ) : (
              <div className={Styles.videoContainer}>
                {
                  video.length > 0 ? video.map((value, index) => <VideoBlock data={value} />) : ''
                }
              </div>
            )
        }
        <div className={Styles.loadMore} ref="wrapper">
          {
            this.state.tab === 0 ? (
              Number(total) > 4 ? (
                current * this.state.pageSize < Number(total) ? <Spin /> : <span>加载已完成</span>
              ) : ''
            ) : ''
          }
          {
            this.state.tab === 1 ? (
              Number(total) > 9 ? (
                current * this.state.pageSize < Number(total) ? <Spin /> : <span>加载已完成</span>
              ) : ''
            ) : ''
          }
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 资讯收藏
    newsMyCollection: bindActionCreators(newsMyCollection, dispatch),
    // 视频收藏
    videoMyCollect: bindActionCreators(videoMyCollect, dispatch),
    // 资讯详情
    getNewsDetails: bindActionCreators(getNewsDetails, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    collect: state.get('collect', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'collect', reducer });
const withSaga = injectSaga({ key: 'collect', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Collect);
