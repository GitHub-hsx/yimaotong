/*
 * @Description: 翼交易信息页
 * @Author: haoyuanyuan
 * @Date: 2019-07-06 17:02:03
 * @LastEditTime: 2019-08-11 17:42:49
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import {
  Carousel, WingBlank, WhiteSpace, TabBar,
} from 'antd-mobile';
import {
  TitleDisplay,
  BottomBar,
  Tabs,
  Spin,
} from 'components';
import {
  formaMoney,
} from 'utils/commonFunction';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import moment from 'moment';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  banner,
  // 我的发布
  myBusiness,
  // 最新供应
  newSupply,
  // 最新需求
  newPurchase,
  // 清空数据
  clearList,
  // 气质报告
  gasReport,
  // 实时液价
  realTimeMessage,
  // 查询企业认证
  entAuth,
  // 企业实名认证
  queryAuth,
} from './redux/actions';
import {
  arrUp,
  arrDown,
  home,
  homeSelected, // 首页
  mine,
  mineSelect,
  back, // 返回上一页
  publish,
  publishs,
  pay,
  payed,
  messages,
  msg,
} from '../../../assets/picture';
import PayPersonal from '../../M020104/M02010401/Loadable'; // 首页
import PayMessage from '../../M020102/M02010201/Loadable'; // 易交易信息页
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

let current = 0;

class PayHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      hidden: false,
      fullScreen: true,
      // 信息
      tab: 0,
      memberId: '',
      pageSize: 10,
      isLoadingMore: false,
    };
    // alert(localStorage.getItem('login'));
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
    this.banner(); // 轮播图
    this.realTimeMessage(); // 实时液价
    // this.entAuth(); // 企业认证查询

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.global.phoneData !== this.props.global.phoneData) {
      this.setState({
        memberId: JSON.parse(localStorage.getItem('login')).id,
      }, () => {
        this.entAuth(); // 企业认证查询
      });
    }
    window.Jockey.send('ymt_hiddenLeftBtn', {});
  }

  componentWillUnmount() {
    window.Jockey.send('ymt_showLeftBtn', {});
  }

  // 发布供应
  onClickTake = () => {
    const {
      authFlag,
    } = this.props.payHome.entAuth;
    const query = this.props.payHome;
    if (authFlag == 0) {
      this.props.history.push('/M020105/01');
    } else if (authFlag == 1) {
      this.props.history.push('/M020103/02');
    } else if (query.authFlag == 0) {
      window.location.href(query.url);
    } else {
      this.props.history.push('/M020103/01');
    }
  }

  // 发布采购
  onClickChoose = () => {
    const {
      authFlag,
    } = this.props.payHome.entAuth;
    const query = this.props.payHome;
    if (authFlag == 0) {
      this.props.history.push('/M020105/01');
    } else if (authFlag == 1) {
      this.props.history.push('/M020103/02');
    } else if (query.authFlag == 0) {
      window.location.href(query.url);
    } else {
      this.props.history.push('/M020103/02');
    }
  }

  // 切换底部的tab页
  changeTabs = (e, index) => {
    sessionStorage.setItem('tabBottom', index);
    this.setState({
      selectedTab: index,
    });
    if (index === 0) {
      window.Jockey.send('ymt_goNative', {});
    }
  }

  // 下拉加载更多
  loadMoreDataFn = () => {
    const {
      realTime,
    } = this.props.payHome;
    if (realTime.realTime.length >= current * this.state.pageSize) {
      this.realTimeMessage();
    }
  }

  // 查询企业认证
  entAuth = () => {
    const message = {
      memberId: this.state.memberId,
    };
    this.props.entAuth(message);
  }

  // 企业实名认证
  queryAuth = () => {
    const message = {
      entBh: this.props.payHome.entAuth.entBh,
    };
    this.props.queryAuth(message);
  }

  // 气质报告
  gasReport = (id) => {
    const message = {
      id: id,
    };
    this.props.gasReport(message);
  }

  // 轮播图
  banner = () => {
    const message = {
      number: '3',
      type: '1',
    };
    this.props.banner(message);
  }

  // 报价分页接口
  realTimeMessage = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
      priceDate: moment().format('YYYY-MM-DD'),
    };
    this.props.realTimeMessage(message);
  }

  // 发布
  publishRender() {
    return (
      <div className={Styles.publishRender}>
        <div className={Styles.box}>
          <div className={Styles.take} onClick={this.onClickTake}>
            <div></div>
            <div>发布供应</div>
          </div>
          <div className={Styles.choose} onClick={this.onClickChoose}>
            <div></div>
            <div>发布采购</div>
          </div>
        </div>
      </div>
    );
  }

  renderList(value, index) {
    let imgUrl = '';
    let colors = '';
    if (Number(value.diffPrice) === 0) {
      imgUrl = '';
      colors = '#acacac';
    } else if (Number(value.diffPrice) > 0) {
      imgUrl = arrDown;
      colors = '#349a34';
    } else {
      imgUrl = arrUp;
      colors = '#ff0000';
    }
    const image = {
      backgroundImage: 'url(' + imgUrl + ')',
    };
    const colorStyle = {
      color: colors,
    };
    return (
      <div className={Styles.list} key={index}>
        <div className={Styles.cutTwo}>
          <div className={Styles.firstCut}>
            <div className={Styles.topMsg}>
              <div className={Styles.topOne}>{value.entArea}</div>
              <div className={Styles.topTwo}>{value.gasSj}</div>
            </div>
            <div className={Styles.bottomMsg}>
              <div className={Styles.bottomOne}>{value.entTitle}</div>
              <div className={Styles.bottomTwo}> ￥{value.inqPrice}</div>
              <div className={Styles.bottomTwo}><span style={image} /><span style={colorStyle}>{Math.abs(value.diffPrice)}</span></div>
            </div>
          </div>
          <div className={Styles.buttonContainer}>
            <div className={Styles.button} onClick={() => this.gasReport(value.entId)}>气质报告</div>
          </div>
        </div>
        <WingBlank size="xs">
          <div className={Styles.liner} />
        </WingBlank>
      </div>
    );
  }

  renderContent() {
    const {
      pic,
      realTime,
    } = this.props.payHome;
    return (
      <div>
        <div className={Styles.bgColor}>
          <Carousel
            autoplay
            infinite
          >
            {pic.map(val => (
              <img
                src={val.url + val.picpath}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            // </a>
            ))}
          </Carousel>
          <WingBlank size="xs">
            <WhiteSpace size="lg" />
            <div className={Styles.totalNum}>
              <div className={Styles.car + ' ' + Styles.card}>
                <div className={Styles.totalPay}>累计成交量</div>
                <div>
                  <span className={Styles.green}>{this.props.payHome.sum.totalNum}</span>
                  <span>车</span>
                </div>
              </div>
              <div className={Styles.amount + ' ' + Styles.card}>
                <div>累计成交额</div>
                <div>
                  <span className={Styles.red}>{formaMoney(this.props.payHome.sum.totalAmount)}</span>
                  <span>元</span>
                </div>
              </div>
            </div>
          </WingBlank>
          <WhiteSpace size="md" />
        </div>
        <WhiteSpace size="md" />
        <div className={Styles.bgColor}>
          <WingBlank size="xs">
            <div className={Styles.priceForm}>
              <WhiteSpace />
              <WingBlank size="xs">
                <TitleDisplay bar="red">最新液价 </TitleDisplay>
                <WhiteSpace />
                <WingBlank size="xs">
                  <div className={Styles.liner} />
                </WingBlank>
                <div className={Styles.listContainer}>
                  {
                    realTime.realTime.length > 0 ? realTime.realTime.map((value, index) => this.renderList(value, index)) : ''
                  }
                </div>
                <div className={Styles.loadMore} ref="wrapper">
                  {
                    Number(realTime.realTime.length) > 9 ? (
                      current * this.state.pageSize > realTime.realTime.length ? <span>已加载全部</span> : <Spin />
                    ) : null
                  }
                </div>
              </WingBlank>
            </div>
            <WhiteSpace />
          </WingBlank>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={Styles.payHome}>
        <Helmet>
          <title>贸易</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.marginBottom}>
          {
            this.state.selectedTab === 1 ? this.renderContent() : ''
          }
          {
            this.state.selectedTab === 2 ? this.publishRender() : ''
          }
          {
            this.state.selectedTab === 3 ? <PayMessage /> : ''
          }
          {
            this.state.selectedTab === 4 ? <PayPersonal /> : ''
          }
        </div>
        <BottomBar
          describe={['首页', '贸易', '发布', '信息', '我的']}
          picture={[back, pay, publish, messages, mine]}
          selectPic={[back, payed, publishs, msg, mineSelect]}
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
    banner: bindActionCreators(banner, dispatch),
    // 清空数据
    clearList: bindActionCreators(clearList, dispatch),
    // 气质报告
    gasReport: bindActionCreators(gasReport, dispatch),
    // 实时液价
    realTimeMessage: bindActionCreators(realTimeMessage, dispatch),
    // 查询企业认证
    entAuth: bindActionCreators(entAuth, dispatch),
    // 企业实名认证
    queryAuth: bindActionCreators(queryAuth, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    global: state.get('global').toJS(),
    payHome: state.get('payHome', initialState).toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'payHome', reducer });
const withSaga = injectSaga({ key: 'payHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PayHome);
