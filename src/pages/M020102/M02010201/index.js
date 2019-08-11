/*
 * @Description: 易交易信息页
 * @Author: your name
 * @Date: 2019-07-13 15:31:43
 * @LastEditTime: 2019-08-11 15:59:20
 * @LastEditors: Please set LastEditors
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom'; // 下拉刷新组件依赖react-dom，所以需要将其引进来
import moment from 'moment';
import { compose, bindActionCreators } from 'redux';
import history from 'utils/history';
import {
  WhiteSpace,
  WingBlank,
  PullToRefresh,
  ListView,
} from 'antd-mobile';
import {
  List,
  ListItem,
  Input,
  Tabs,
  Spin,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import {
  formaMoney,
} from 'utils/commonFunction';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 我的发布
  myBusiness,
  // 最新供应
  newSupply,
  // 最新需求
  newPurchase,
  // 清空数据
  clearList,
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

let current = 0;

class PayMessage extends Component {
  static defaultProps = {
    prefixCls: 'jz-tabs',
    selectedIndex: 0,
    disabled: false,
    values: [],
    jumpToBuy() {},
  };

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ // 这个dataSource有cloneWithRows方法
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      a: false,
      tab: 0,
      memberId: '2',
      pageSize: 5,
      isLoadingMore: false,
      // 上拉加载
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      hasMore: true,
    };
    window.Jockey.send('ymt_showRightBtn', {});
  }

  componentDidMount() {
    current = 0;
    this.props.clearList();
    this.myBusiness();

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


    // 下拉加载更多
  }

  componentWillUnmount() {
    window.Jockey.send('ymt_hiddenRightBtn', {});
  }


  loadMoreDataFn = () => {
    if (Number(this.props.payMessage.total) > current * this.state.pageSize) {
      if (this.state.tab === 0) {
        this.myBusiness();
      } else if (this.state.tab === 1) {
        this.newSupply();
      } else {
        this.newPurchase();
      }
    }
  }

  // 我的发布
  myBusiness = () => {
    current += 1;
    const message = {
      current: current,
      memberId: this.state.memberId,
      pageSize: this.state.pageSize,
    };
    this.props.myBusiness(message);
  }

  // 最新供应
  newSupply = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
    };
    this.props.newSupply(message);
  }

  // 最新需求
  newPurchase = () => {
    current += 1;
    const message = {
      current: current,
      pageSize: this.state.pageSize,
    };
    this.props.newPurchase(message);
  }

  // 切换tab标签
  changeTab = (e, index) => {
    current = 0;
    this.props.clearList();
    this.setState({
      tab: index,
    });
    if (index === 0) {
      this.myBusiness();
    } else if (index === 1) {
      this.newSupply();
    } else if (index === 2) {
      this.newPurchase();
    }
  }

  // 客服
  chat = (e) => {
    e.stopPropagation();
    window.Jockey.send('ymt_im', {
      customerServiceID: 'iostest10291',
    });
  }

  // 抢购
  jumpToBuy = (value, index, e) => {
    history.push('/M020102/05');
    sessionStorage.setItem('msg', JSON.stringify(value));
    e.stopPropagation();
  }

  tellPrice = (value, e) => {
    sessionStorage.setItem('msg', JSON.stringify(value));
    history.push('/M020102/06');
    e.stopPropagation();
  }

  // 跳转详情
  jumpToDetails = (value) => {
    sessionStorage.setItem('detail', JSON.stringify(value));
    if (this.state.tab === 0) {
      console.log(value);
      history.push('/M020102/03'); // 进入客户选择页
    } else {
      history.push('/M020102/02'); // 进入详情页
    }
  }

  // 供应
  listRenderMine(value, index) {
    return (
      <div onClick={() => this.jumpToDetails(value)}>
        <div className={Styles.list}>
          <WingBlank size="md">
            <div className={Styles.content}>
              <div className={Styles.line}>
                <div className={Styles.left}>供应商：{value.entName}</div>
                <div className={Styles.right}>
                  {
                    this.state.tab === 0
                      ? value.purDate ? (value.pubDate.substring(0, 10) + ' ' + value.pubDate.substring(value.pubDate.length - 8, value.pubDate.length - 3)) : ''
                      : value.pubDatetime ? (value.pubDatetime.substring(0, 10) + ' ' + value.pubDatetime.substring(value.pubDatetime.length - 8, value.pubDatetime.length - 3)) : ''
                  }
                </div>
              </div>
              <div className={Styles.line}>
                <strong className={Styles.left}>LNG： {this.state.tab === 0 ? value.num : value.supNum}车</strong>
                <strong className={Styles.right}>{this.state.tab === 0 ? formaMoney(value.price) : formaMoney(value.supPrice)}元/吨</strong>
              </div>
              <div className={Styles.line}>
                {
                  this.state.tab === 1
                    ? (
                      <div className={Styles.left}>
                     装车时间：{ value.supDate ? value.supDate.substring(0, 10).replace(/-/g, '') : ''}
                      </div>
                    )
                    : <div className={Styles.left}>液原厂： {value.supFactor}</div>
                }
                {
                  this.state.tab === 0 ? <strong className={Styles.clearMargin + ' ' + Styles.right}>{value.isOffer == '0' ? '等待采购中' : '采购已完成'}</strong> : ''
                }
              </div>
              <div className={Styles.line}>
                {
                  this.state.tab === 0 ? (
                    <div className={Styles.left}>
                    装车时间：{value.date ? value.date.substring(0, 10).replace(/-/g, '') : ''}
                    </div>
                  )
                    : <div className={Styles.left}>液原厂：{value.supFactory}</div>
                }
                <div className={Styles.right}>
                  {
                    this.state.tab === 0 ? <div className={Styles.button} onClick={(e) => this.chat(e)}>沟通</div> : <div className={Styles.button} onClick={(e) => this.jumpToBuy(value, index, e)}>抢购</div>
                  }
                </div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
      </div>
    );
  }

  // 我的采购
  PurchaseMine(value, index) {
    return (
      <div onClick={() => this.jumpToDetails(value)}>
        <div className={Styles.list}>
          <WingBlank size="md">
            <div className={Styles.content}>
              <div className={Styles.line}>
                <div className={Styles.left}>采购商：{value.entName}</div>
                <div className={Styles.right}>{value.pubDate ? (value.pubDate.substring(0, 10) + ' ' + value.pubDate.substring(value.pubDate.length - 8, value.pubDate.length - 3)) : ''}</div>
              </div>
              <div className={Styles.line}>
                <strong className={Styles.left}>LNG： {value.num}车</strong>
                <strong className={Styles.right}></strong>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货地址： {value.address}</div>
                <strong className={Styles.clearMargin + ' ' + Styles.right}>{value.isOffer == '0' ? '等待报价中' : '报价已完成'}</strong>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货时间：{ value.date ? value.date.substring(0, 10).replace(/-/g, '') : ''}</div>
                <div className={Styles.right}>
                  <div className={Styles.button} onClick={(e) => this.chat(e)}>沟通</div>
                </div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
      </div>
    );
  }

  // 最新需求
  supply(value, index) {
    return (
      <div key={index} onClick={() => this.jumpToDetails(value)}>
        <div className={Styles.list}>
          <WingBlank size="md">
            <div className={Styles.content}>
              <div className={Styles.line}>
                <div className={Styles.left}>采购商：{value.entName}</div>
                <div className={Styles.right}>{value.pubDatetime.substring(0, 10) + ' ' + value.pubDatetime.substring(value.pubDatetime.length - 8, value.pubDatetime.length - 3)}</div>
              </div>
              <div className={Styles.line}>
                <strong className={Styles.left}>LNG： {value.purNum}车</strong>
                {/* <strong className={Styles.right}>3350元/吨</strong> */}
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货地址： {value.purAddress}</div>
                <div className={Styles.clearMargin + ' ' + Styles.right}>到货日：{value.purDate.substring(0, 10).replace(/-/g, '')}</div>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}></div>
                <div className={Styles.right}>
                  <div className={Styles.button} onClick={(e) => this.tellPrice(value, e)}>报价</div>
                </div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
      </div>
    );
  }

  renderMine(value, index) {
    return (
      <div key={index}>
        {
          value.type && value.type == '2' ? this.listRenderMine(value, index) : this.PurchaseMine(value, index) // '1'供应；'2'采购
        }
      </div>
    );
  }

  render() {
    const myList = this.props.payMessage.list.list; // 我的发布
    // 这里就是个渲染数据，rowData就是每次过来的那一批数据，已经自动给你遍历好了，rouID可以作为key值使用，直接渲染数据即可
    const row = (rowData, sectionID, rowID) => (
      <div key={rowID} style={{ height: '100px' }}>{rowData.name}</div>
    );
    return (
      <div className={Styles.payMessage}>
        <Helmet>
          <title></title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <WingBlank size="xs">
          <div className={Styles.bgColor}>
            <div className={Styles.tabs}>
              <Tabs values={['我的发布', '最新供应', '最新需求']} onChange={this.changeTab} selectedIndex={this.state.tab} />
            </div>
            <div className={Styles.center}>
              {
                this.state.tab === 0 ? (
                  myList.length > 0 ? myList.map((value, index) => this.renderMine(value, index)) : ''
                ) : ''
              }
              {
                this.state.tab === 1 ? (
                  myList.length > 0 ? myList.map((value, index) => this.listRenderMine(value, index)) : ''
                ) : ''
              }
              {
                this.state.tab === 2 ? (
                  myList.length > 0 ? myList.map((value, index) => this.supply(value, index)) : ''
                ) : ''
              }

              <div className={Styles.loadMore} ref="wrapper">
                {
                  Number(this.props.payMessage.total) > 10 ? (
                    current * this.state.pageSize >= this.props.payMessage.total ? <span>已加载全部</span> : <Spin />
                  ) : null
                }
              </div>
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 我的发布
    myBusiness: bindActionCreators(myBusiness, dispatch),
    // 最新供应
    newSupply: bindActionCreators(newSupply, dispatch),
    // 最新需求
    newPurchase: bindActionCreators(newPurchase, dispatch),
    // 清空数据
    clearList: bindActionCreators(clearList, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    payMessage: state.get('payMessage', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'payMessage', reducer });
const withSaga = injectSaga({ key: 'payMessage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PayMessage);
