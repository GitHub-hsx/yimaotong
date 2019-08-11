/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-10 18:39:38
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace,
  WingBlank,
  Toast,
} from 'antd-mobile';
import {
  TitleDisplay,
  Spin,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 新闻评论列表
  newsCommentList,
  clearCommentList,
  // 点赞
  newsAgreeSuccess,
  newsAgreeError,
  // 添加评论
  newsAddCommentSuccess,
  newsAddCommentError,
  // 收藏
  newsCollectSuccess,
  newsCollectError,
  // 新闻详情
  getNewsDetails,
  // 新闻操作
  newsRelativeSuccess,
  newsRelativeError,
} from './redux/actions';
import Styles from './style.less';
import {
  agree,
  agreed,
  collect,
  collected,
  share,
} from '../../../assets/picture';
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
let current = 0;


class InformationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      agree: false, // 是否点赞显示提示消息
      isAgree: false, // 传递数值上送接口
      collect: false, // 是否收藏显示页面提示
      isCollect: false, // 传递数值上送接口
      memberId: this.props.global.phoneData.id, // 客户ID
      show: true,
      comment: '', // 新闻评论内容
      isLoadingMore: false,
      newsId: localStorage.getItem('id'),
    };
    this.newsAddComment = this.newsAddComment.bind(this);
    localStorage.removeItem('id');
  }

  componentDidMount() {
    current = 0;
    this.props.clearCommentList();
    this.getNewsCommentList(); // 新闻评论
    // this.onClickJumpNew(); // 新闻详情
    this.newsRelative(); // 新闻相关操作接口请求
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

  componentWillReceiveProps(nextProps) {
    if (this.props.global.phoneData !== nextProps.phoneData) {
      this.setState({
        newsId: localStorage.getItem('id'),
      }, () => {
        this.onClickJumpNew();
      });
    }
  }

  // 资讯跳转至详情页
  onClickJumpNew = () => {
    const message = {
      id: this.state.newsId,
    };
    this.props.getNewsDetails(message);
  }


  // 点赞收藏
  onClickChangeState = (index) => {
    if (index === '1') {
      this.setState({
        isAgree: !this.state.isAgree,
      }, () => {
        this.newsAgree();
      });
    } else {
      this.setState({
        isCollect: !this.state.isCollect,
      }, () => {
        this.newsCollect();
      });
    }
  }

  // 评论
  onClickShow = () => {
    setTimeout(() => {
      this.setState({
        show: !this.state.show,
      });
    }, 100);
  }

  loadMoreDataFn = () => {
    // current = 0;
    if (current * 5 < Number(this.props.informationDetail.total)) {
      this.getNewsCommentList();
    }
  }

  /**
   * 获取新闻评论
   */
  getNewsCommentList = () => {
    current += 1;
    const message = {
      current: current, // 当前页
      pageSize: 5,
      newsId: this.state.newsId, // 新闻id
    };
    this.props.newsCommentList(message);
  }

  // 输入新闻评论内容
  onChangeComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  // 新闻分享
  onClickShareNews = () => {
    const {
      detail,
    } = this.props.informationDetail;
    window.Jockey.send('ymt_WXshare', {
      title: detail.title, // 分享标题
      description: detail.description, // 分享描述
      webpageUrl: '', // 链接
    });
  }

  /**
   * 新闻点赞接口请求
   */
  async newsAgree() {
    const message = {
      isRelative: this.state.isAgree ? 1 : 0, // 是否操作 0-否，1-是
      memberId: this.state.memberId, // 会员ID
      newsId: this.state.newsId, // 新闻ID
    };
    try {
      const result = await requestPost(requestUrl + '/article/news/fabulous', message);
      if (result.status == '1') {
        this.props.newsAgreeSuccess(result.data);
        this.setState({
          agree: !this.state.agree,
        }, () => {
          Toast.info(this.state.agree ? '已点赞！' : '取消点赞！', 1, null, false);
        });
      } else {
        this.props.newsAgreeError(result.message);
      }
    } catch (e) {
      this.props.newsAgreeError(e.message);
    }
  }

  /**
   * 新闻收藏
   */
  async newsCollect() {
    const message = {
      isRelative: this.state.isCollect ? 1 : 0, // 是否操作 0-否，1-是
      memberId: this.state.memberId, // 会员ID
      newsId: this.state.newsId, // 新闻ID
    };
    try {
      const result = await requestPost(requestUrl + '/article/news/collection', message);
      if (result.status == '1') {
        this.props.newsCollectSuccess(result.data);
        this.setState({
          collect: !this.state.collect,
        }, () => {
          Toast.info(this.state.collect ? '已收藏！' : '取消收藏！', 1, null, false);
        });
      } else {
        this.props.newsCollectError(result.message);
      }
    } catch (e) {
      this.props.newsCollectError(e.message);
    }
  }

  /**
   * 新闻新增评论
   */
  async newsAddComment() {
    if (this.state.comment.replace(/\s/ig, '').length > 0) {
      const message = {
        content: this.state.comment, // 评论的内容
        memberId: this.state.memberId, // 会员ID
        newsId: this.state.newsId, // 新闻ID
      };
      try {
        const result = await requestPost(requestUrl + '/article/news/commentAdd', message);
        if (result.status == '1') {
          this.props.newsAddCommentSuccess(result.data);
          Toast.info('评论成功！', 1, null, false);
          current = 0;
          this.props.clearCommentList();
          this.getNewsCommentList(); // 获取新闻评论列表
          this.setState({
            comment: '',
          });
        } else {
          this.props.newsAddCommentError(result.message);
        }
      } catch (e) {
        this.props.newsAddCommentError(e.message);
      }
    } else {
      this.setState({
        comment: '',
      });
    }
  }

  /**
   * 新闻相关操作
   */
  async newsRelative() {
    const message = {
      isRelative: '', // 是否操作 0-否，1-是
      memberId: this.state.memberId, // 会员ID
      newsId: this.state.newsId, // 新闻ID
    };
    try {
      const result = await requestPost(requestUrl + '/article/news/newsRelative', message);
      if (result.status == '1') {
        this.props.newsRelativeSuccess(result.data);
        this.setState({
          isAgree: result.data.fabulousCount == 1,
          agree: result.data.fabulousCount == 1,
          isCollect: result.data.isCollection == 1,
          collect: result.data.isCollection == 1,
        });
      } else {
        this.props.newsRelativeError(result.message);
      }
    } catch (e) {
      this.props.newsRelativeError(e.message);
    }
  }

  // 评论列表
  renderCommentList(value, index) {
    const bgPic = {
      backgroundImage: value.picPath.substring(0, 4) == 'http' ? 'url(' + value.picPath + ')' : 'url(' + IMG_NAME_BASE_URL + value.picPath + ')',
    };
    return (
      <div key={index} className={Styles.oneCell}>
        <div className={Styles.photo}>
          <div className={Styles.pic} style={bgPic} />
        </div>
        <div className={Styles.commentMessage}>
          <div className={Styles.top}>
            <div className={Styles.memberID}>{value.nickname}</div>
            <div className={Styles.time}>{value.timei}</div>
          </div>
          <div className={Styles.content}>{value.content}</div>
        </div>
      </div>
    );
  }

  render() {
    const {
      list,
      total,
      detail,
    } = this.props.informationDetail;
    const inputStyle = {
      maxWidth: this.state.show ? '' : '80%',
    };
    return (
      <div className={Styles.informationDetail}>
        <Helmet>
          <title>新闻详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <WingBlank size="xs">
          {/* <TitleDisplay isHtml="isHtml">{detail.title}</TitleDisplay> */}
          {/* <div className={Styles.pic}>
            <img src={IMG_NAME_BASE_URL + pic[0]} alt="" />
          </div> */}
          <div className={Styles.detailContent}>
            <div dangerouslySetInnerHTML={{ __html: detail.description }} className={Styles.description} />
            <div dangerouslySetInnerHTML={{ __html: detail.content }} className={Styles.contentStyle} />
          </div>
          <WhiteSpace />
          <div className={Styles.liner} />
          <WhiteSpace />
          <div className={Styles.comment}>全部评论({total})</div>
          <div className={Styles.commentList}>
            {
              list.list.length > 0 ? list.list.map((value, index) => this.renderCommentList(value, index)) : ''
            }
            <div className={Styles.loadMore} ref="wrapper">
              {
                current * 5 > Number(total) ? '' : <Spin />
              }
            </div>
          </div>
        </WingBlank>
        <div className={Styles.option}>
          <div className={Styles.input} style={inputStyle}>
            <input placeholder="请输入评论" maxLength="70" value={this.state.comment} onChange={(e) => this.onChangeComment(e)} onFocus={this.onClickShow} onBlur={this.onClickShow} />
            {
              this.state.show ? null : <span onClick={this.newsAddComment}>发送</span>
            }
          </div>
          {
            this.state.show ? (
              <div className={Styles.personOption}>
                <div onClick={() => this.onClickChangeState('1')}>
                  {
                    this.state.agree ? <img alt="" src={agreed} /> : <img alt="" src={agree} />
                  }
                </div>
                <div div onClick={() => this.onClickChangeState('2')}>
                  {
                    this.state.collect ? <img alt="" src={collected} /> : <img alt="" src={collect} />
                  }
                </div>
                <div>
                  <img alt="" src={share} onClick={this.onClickShareNews} />
                </div>
              </div>
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
    // 新闻评论列表
    newsCommentList: bindActionCreators(newsCommentList, dispatch),
    clearCommentList: bindActionCreators(clearCommentList, dispatch),
    // 点赞
    newsAgreeSuccess: bindActionCreators(newsAgreeSuccess, dispatch),
    newsAgreeError: bindActionCreators(newsAgreeError, dispatch),
    // 添加评论
    newsAddCommentSuccess: bindActionCreators(newsAddCommentSuccess, dispatch),
    newsAddCommentError: bindActionCreators(newsAddCommentError, dispatch),
    // 收藏
    newsCollectSuccess: bindActionCreators(newsCollectSuccess, dispatch),
    newsCollectError: bindActionCreators(newsCollectError, dispatch),
    // 新闻详情
    getNewsDetails: bindActionCreators(getNewsDetails, dispatch),
    // 新闻操作
    newsRelativeSuccess: bindActionCreators(newsRelativeSuccess, dispatch),
    newsRelativeError: bindActionCreators(newsRelativeError, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    informationDetail: state.get('informationDetail', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'informationDetail', reducer });
const withSaga = injectSaga({ key: 'informationDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InformationDetail);
