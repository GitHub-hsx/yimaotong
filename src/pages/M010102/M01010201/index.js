/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-10 21:19:32
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import ReactDOM from 'react-dom'; // 下拉刷新组件依赖react-dom，所以需要将其引进来
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace,
  WingBlank,
  PullToRefresh,
  ListView,
  Button,
  TabBar,
  Toast,
} from 'antd-mobile';
import {
  TitleDisplay,
  Tabs,
  Spin,
  BottomBar,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 获取新闻推荐和政策的列表
  addAssociateAccount,
  clearNewsList,
  // 获取新闻详情
  getNewsDetails,
  // 获取行情消息列表
  situationList,
  // 消息长度
  total,
  // 视频列表
  video,
} from './redux/actions';
import Styles from './style.less';
import VideoBlock from '../../UI/VideoBlock'; // 获取新闻模块代码
import PersonalMessage from '../../M010201/M01020101/Loadable';

import {
  home,
  homeSelected, // 首页
  mine,
  mineSelect,
  back, // 返回上一页
  publish,
  publishs,
  friend,
  friends,
} from '../../../assets/picture';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

let current = 0;

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsType: '3', // 新闻类型
      tab: 0, // 控制标签切换
      pageSize: 20,
      isLoadingMore: false,
      fullScreen: true,
      selectedTab: 1,
    };
    window.Jockey.send('ymt_hiddenLeftBtn', {});
  }

  componentDidMount() {
    if (sessionStorage.getItem('tabBottom')) {
      this.setState({
        selectedTab: Number(sessionStorage.getItem('tabBottom')),
      });
    } else {
      this.setState({
        selectedTab: 1,
      });
    }
    this.props.clearNewsList();
    this.getNewLList();

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

  componentWillUnmount() {
    window.Jockey.send('ymt_showLeftBtn', {});
  }

  // 跳转至新闻详情页面
  onClickJumpNew = (value) => {
    // current = 0;
    window.Jockey.send('ymt_goNewsContent', {
      newsID: value.id.toString(),
      router: '/M010102/02',
    });
    // this.props.history.push('/M010102/02');
    // localStorage.setItem('id', value.id);
    // const message = {
    //   id: value.id,
    // };
    // this.props.getNewsDetails(message);
  }

  // 跳转至行情详情页面
  onClickJumpMarket = (value) => {
    // current = 0;
    window.Jockey.send('ymt_goNewsContent', {
      newsID: value.id.toString(),
      router: '/M010103/02',
    });
    // this.props.history.push({
    //   pathname: '/M010103/02',
    //   id: value.id,
    // });
  }

  // 视频与客户端交互
  onClickJump = (value, index) => {
    // alert('与客户端交互');
    window.Jockey.send('ymt_lookVideo', {
      videoListIndex: current.toString(), // 第几组
      videoIndex: index.toString(), // 第几个视频
      videoList: this.props.information.list.list, // 所有视频数据
      videoFlag: 'all',
    });
  }

  // 拍视频
  onClickTake = () => {
    window.Jockey.send('ymt_shootVideo', {});
  }

  // 选视频
  onClickChoose = () => {
    window.Jockey.send('ymt_selectVideo', {});
  }


  onePictureRender(value, pic, index) {
    const one = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[0] + ')',
    };
    const flexStyle = {
      flexBasis: pic[0] === '' ? '100%' : '65%',
    };
    return (
      <div>
        <div className={Styles.style_one} key={index}>
          <div className={Styles.messageContent} style={flexStyle}>
            <WingBlank>
              <div className={Styles.title}>
                <TitleDisplay isHtml="html">{value.title}</TitleDisplay>
              </div>
              <div className={Styles.time}>
                <span>{value.virtualClick}阅读</span>
                <span>{value.timei}</span>
              </div>
            </WingBlank>
          </div>
          {
            pic[0] === '' ? '' : <div className={Styles.picture} style={one} />
          }
        </div>
      </div>
    );
  }

  // 请求接口获取新闻
  getNewLList = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
      newsType: this.state.newsType,
    };
    this.props.addAssociateAccount(message);
  }

  // 获取视频列表
  getVideos = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
    };
    this.props.video(message);
  }

  // 切换tab标签
  changeTab = (e, index) => {
    current = 0;
    sessionStorage.setItem('tab', index);
    this.props.clearNewsList();
    this.props.total(0);
    if (index === 0) { // 推荐
      this.setState({
        newsType: '3',
        tab: index,
      }, () => {
        this.getNewLList();
      });
    } else if (index === 1) { // 视频
      this.setState({
        tab: index,
      }, () => {
        this.getVideos();
      });
    } else if (index === 2) { // 行情
      this.setState({
        tab: index,
      }, () => {
        this.situationList();
      });
    } else if (index === 3) { // 国内
      this.setState({
        tab: index,
      }, () => {
      });
    } else if (index === 4) { // 国际
      this.setState({
        tab: index,
      }, () => {
      });
    } else if (index === 5) { // 政策
      this.setState({
        tab: index,
        newsType: '2',
      }, () => {
        this.getNewLList();
      });
    }
  }

  changeTabs = (e, index) => {
    if (index === 0) {
      window.Jockey.send('ymt_goNative', {});
    } else {
      current = 0;
      sessionStorage.setItem('tabBottom', index);
    }
    if (index === 3) {
      Toast.info('圈子正在开发中，敬请期待', 1, null, true);
    }
    this.setState({
      selectedTab: index,
    });
  }

  loadMoreDataFn = () => {
    // current = 0;
    if (current * 20 < Number(this.props.information.data)) {
      if (this.state.tab === 0 || this.state.tab === 5) {
        this.getNewLList();
      } else if (this.state.tab === 1) {
        this.getVideos();
      } else if (this.state.tab === 2) {
        this.situationList();
      }
    }
  }

  // 行情列表消息
  situationList = () => {
    current += 1;
    const message = {
      current: current, // 当前页
      pageSize: this.state.pageSize, // 每页显示数
    };
    this.props.situationList(message);
  }

  threePictureRender(value, pic, index) {
    const one = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[0] + ')',
    };
    const two = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[1] + ')',
    };
    const three = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[2] + ')',
    };
    return (
      <div className={Styles.style_two} key={index}>
        <WingBlank>
          <TitleDisplay isHtml="html">{value.title}</TitleDisplay>
          <div className={Styles.pictureContent}>
            <div style={one}>
              {/* <img src={IMG_NAME_BASE_URL + pic[0]} alt="" /> */}
            </div>
            <div style={two}>
              {/* <img src={IMG_NAME_BASE_URL + pic[1]} alt="" /> */}
            </div>
            <div style={three}>
              {/* <img src={IMG_NAME_BASE_URL + pic[2]} alt="" /> */}
            </div>
          </div>
          <div className={Styles.time}>
            <span>{value.virtualClick}阅读</span>
            <span>{value.timei}</span>
          </div>
        </WingBlank>
        <WhiteSpace />
      </div>
    );
  }

  publishRender() {
    return (
      <div className={Styles.publishRender}>
        <div className={Styles.box}>
          <div className={Styles.take} onClick={this.onClickTake}>
            <div></div>
            <div>拍视频</div>
          </div>
          <div className={Styles.choose} onClick={this.onClickChoose}>
            <div></div>
            <div>传视频</div>
          </div>
        </div>
      </div>
    );
  }


  renderChoosePic(value, index) {
    const pic = value.picUrl.split(';');
    return (
      <div key={index} onClick={() => this.onClickJumpNew(value)}>
        {
          pic.length > 2 ? this.threePictureRender(value, pic, index) : this.onePictureRender(value, pic, index)
        }
      </div>
    );
  }

  // 行情样式
  renderListRender(value, index) {
    return (
      <div className={Styles.list} key={index} onClick={() => this.onClickJumpMarket(value)}>
        <WingBlank>
          <div className={Styles.message}>
            <div className={Styles.time}>{value.timei.substring(0, 10)}</div>
            <div className={Styles.title} dangerouslySetInnerHTML={{ __html: value.title }} />
          </div>
          <div className={Styles.describe}>
            <div>{value.content}</div>
          </div>
        </WingBlank>
      </div>
    );
  }

  renderListTab() {
    const newsList = this.props.information.list.list;
    const {
      data,
    } = this.props.information;
    return (
      <div>
        <div className={Styles.tabs}>
          <Tabs values={['推荐', '视频', '行情', '国内', '国际', '政策']} onChange={this.changeTab} selectedIndex={this.state.tab} />
        </div>
        <div className={Styles.App}>
          {
            this.state.tab === 0 || this.state.tab === 5
              ? (newsList.length > 0 ? newsList.map((value, index) => this.renderChoosePic(value, index)) : null)
              : null
          }
          <div className={Styles.videoContainer}>
            {
              this.state.tab === 1
                ? (
                  newsList.length > 0 ? newsList.map((value, index) => <VideoBlock data={value} key={index} blockLine="two" onClickJumpNew={() => this.onClickJump(value, index)} />) : ''
                )
                : null
            }
          </div>

          {
            this.state.tab === 2
              ? (newsList.length > 0 ? newsList.map((value, index) => this.renderListRender(value, index)) : null)
              : null
          }
        </div>
        <div className={Styles.loadMore} ref="wrapper">
          {
            Number(data) > 10 ? (
              current * 20 > data ? <span>没有内容啦</span> : <Spin />
            ) : null
          }
        </div>
      </div>

    );
  }

  render() {
    const newsList = this.props.information.list.list;
    const {
      data,
    } = this.props.information;
    return (
      <div className={Styles.information}>
        <Helmet>
          <title>资讯</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        {
          this.state.selectedTab === 1 ? this.renderListTab() : ''
        }

        {
          this.state.selectedTab === 2 ? this.publishRender() : ''
        }
        {
          this.state.selectedTab === 4 ? <PersonalMessage /> : ''
        }
        <BottomBar
          describe={['首页', '资讯', '发布', <div>&nbsp;圈子</div>, '我的']}
          picture={[back, home, publish, friends, mine]}
          selectPic={[back, homeSelected, publishs, friend, mineSelect]}
          selectedIndex={this.state.selectedTab}
          onChange={this.changeTabs}
        >
        </BottomBar>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 获取新闻推荐和政策列表
    addAssociateAccount: bindActionCreators(addAssociateAccount, dispatch),
    clearNewsList: bindActionCreators(clearNewsList, dispatch),
    // 获取新闻详情
    getNewsDetails: bindActionCreators(getNewsDetails, dispatch),
    // 行情列表获取
    situationList: bindActionCreators(situationList, dispatch),
    // 消息长度
    total: bindActionCreators(total, dispatch),
    // 视频列表
    video: bindActionCreators(video, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    information: state.get('information', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'information', reducer });
const withSaga = injectSaga({ key: 'information', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Information);
