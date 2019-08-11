/*
 * @Description: 我的订单
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-11 13:19:29
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace,
  WingBlank,
  Button,
  TabBar,
  Toast,
} from 'antd-mobile';
import {
  List,
  ListItem,
  Tabs,
  Spin,
  Time,
} from 'components';
import {
  countDown,
} from 'utils/commonFunction';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 订单列表
  orderList,
  // 清空数据
  clearData,
  // 取消或者删除订单
  cancelSuccess,
  cancelError,
  // 生成订单
  createSuccess,
  createError,
  // 签署合同
  contractSuccess,
  contractError,
} from './redux/actions';
import Styles from './style.less';
import {
  noPhoto,
} from '../../../assets/picture.js';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
const Item = List.Item;

let current = 0;

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0, // 当前页
      // memberId: JSON.parse(localStorage.getItem('login')).id,
      memberId: '2', // 会员ID
      orderState: '99', // 订单状态（0-待签约 1-待付款 2-待结算 3-待评价 4-已完成 5-已失效 6-交易关闭 7-自动结算）,查询全部时orderState 不传值
      pageSize: 10, // 每页显示数
    };
    this.cancel = this.cancel.bind(this);
    this.contract = this.contract.bind(this);
  }

  componentDidMount() {
    current = 0;
    this.props.clearData();
    this.orderList();

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

  loadMoreDataFn = () => {
    if (this.props.myOrder.total > current * this.state.pageSize) {
      this.orderList();
    }
  }

  onClickPress = () => {
    // alert('11');
  }

  haveTime = (time) => {
    // alert(time);
  }

  // 倒计时
 countDown = (serviceTime, time) => {
   time = '2019-08-11 00:30:00';
   // alert(serviceTime);
   const endTime = new Date(time.replace(/\-/g, '/'));
   const service = new Date(serviceTime.replace(/\-/g, '/'));
   let last = parseInt(endTime - service) + 30 * 60 * 1000;
   let clock = '';
   const timer = setInterval(() => {
     last -= 1000;
     const min = last / 1000 / 60 >= 1 ? Math.floor(last / 1000 / 60) : '00';
     const sec = last - min * 1000 * 60;
     const second = Math.floor(sec / 1000);
     clock = min + ':' + second;
     if (min == 0) {
       clearInterval(timer);
     }
   }, 1000);
 }


  // 切换tab标签
  changeTab = (e, index) => {
    this.props.clearData();
    current = 0;
    this.setState({
      tab: index,
    });
    let orderState = '';
    if (index === 0) {
      orderState = '99';
    } else if (index === 1) {
      orderState = '0';
    } else if (index === 2) {
      orderState = '1';
    } else if (index === 3) {
      orderState = '2';
    } else if (index === 4) {
      orderState = '3';
    }
    this.setState({
      orderState: orderState,
    }, () => {
      this.orderList();
    });
  }

  // 订单列表
  orderList = () => {
    current += 1;
    const message = {
      current: current,
      memberId: this.state.memberId,
      orderState: this.state.orderState,
      pageSize: this.state.pageSize,
    };
    this.props.orderList(message);
  }

  // 订单评价
  evaluate = (value) => {
    console.log(value);
    sessionStorage.setItem('order', JSON.stringify(value));
    this.props.history.push('/M020104/03');
  }

  // 订单签约
  jumpContract = (value) => {
    sessionStorage.setItem('order', JSON.stringify(value));
    this.props.history.push('/M020104/04');
  }


  // 客服
  chat = () => {
    window.Jockey.send('ymt_im', {
      customerServiceID: 'iostest10291',
    });
  }

  // 客服
  onClickJumpToService = (value) => {
    if (value.order_state == 1 || value.order_state == 6) { // 待付款1;交易关闭6
      sessionStorage.setItem('order', JSON.stringify(value));
      this.props.history.push('/M020104/05');
    } else {
      this.chat();
    }
  }

  // 待结算
  jumpAccount = (value) => {
    sessionStorage.setItem('order', JSON.stringify(value));
    this.props.history.push('/M020104/06');
  }

  // 运输状态
  jumpToTransport = (value) => {
    sessionStorage.setItem('order', JSON.stringify(value));
    this.props.history.push('/M020104/07');
  }

  // 删除或者取消订单
  async cancel(id) {
    const message = {
      id: id,
    };
    try {
      const result = await requestPost(requestUrl + '/business/order/cancel', message);
      if (result.status == '1') {
        this.props.cancelSuccess(result.data);
        this.setState({
          agree: !this.state.agree,
        }, () => {
          Toast.info('操作成功', 1, null, false);
          this.props.clearData();
          this.orderList();
        });
      } else {
        this.props.cancelError(result.message);
      }
    } catch (e) {
      this.props.cancelError(e.message);
    }
  }

  // 生成订单
  async create(value) {
    const message = {
      offerID: 0,
      parentId: 0,
      type: 0,
    };
    try {
      const result = await requestPost(requestUrl + '/business/order/create', message);
      if (result.status == '1') {
        this.props.createSuccess(result.data);
      } else {
        this.props.createError(result.message);
      }
    } catch (e) {
      this.props.createError(e.message);
    }
  }

  // 签约合同
  async contract(value) {
    const message = {
      entBh: value.entBh,
      orderId: value.orderId,
      returnUrl: requestUrl + '/#/M020104/02',
    };
    try {
      const result = await requestPost(requestUrl + '/business/order/contract', message);
      if (result.status == '1') {
        this.props.contractSuccess(result.data);
      } else {
        this.props.contractError(result.message);
      }
    } catch (e) {
      this.props.contractError(e.message);
    }
  }

  // 没有图片的情况
  // 订单状态（0-待签约 1-待付款 2-待结算 3-待评价 4-已完成 5-已失效 6-交易关闭 7-自动结算）,查询全部时orderState 不传值
  renderNoPicture(value) {
    return (
      <div>
        <div className={Styles.one + ' ' + Styles.display}>
          <div>合同编号&nbsp;{value.orderid}</div>
          {
            value.order_state === 0 ? <div>待签约<span className={Styles.lastTime}>{countDown(this.props.myOrder.serviceTime, value.order_time)}</span></div> : ''
          }
          {
            value.order_state === 5 ? <div>已失效</div> : ''
          }
        </div>
        <div className={Styles.two + ' ' + Styles.display}>
          <div>甲方</div>
          <div>{value.sup_ent}</div>
        </div>
        <div className={Styles.two + ' ' + Styles.display}>
          <div>乙方</div>
          <div>{value.pur_ent}</div>
        </div>
      </div>
    );
  }

  renderHavePicture(value) {
    const bgImage = {
      backgroundImage: 'url(' + noPhoto + ')',
    };
    return (
      <div>
        <div className={Styles.one + ' ' + Styles.display}>
          {
            value.order_state === 4 ? '' : <div>订单编号&nbsp;201907281514</div>
          }
          {
            value.order_state === 1 ? <div>待付款</div> : ''
          }
          {
            value.order_state === 2 ? <div>待结算</div> : ''
          }
          {
            value.order_state === 3 ? <div>待评价</div> : ''
          }
          {
            value.order_state === 6 ? <div>交易关闭</div> : ''
          }
          {
            value.order_state === 7 ? <div>自动结算</div> : ''
          }
        </div>
        <div className={Styles.Information}>
          <div className={Styles.picture}>
            <div className={Styles.photo} style={bgImage} />
          </div>
          <div className={Styles.message}>
            <div className={Styles.firstParty + ' ' + Styles.party}>
              <div>{value.pur_ent}</div>
              {
                value.order_state === 4 ? <div>交易成功</div> : ''
              }
            </div>
            <div className={Styles.secondParty + ' ' + Styles.party}>
              <div>采购数量</div>
              <div>{value.pur_num}车</div>
              <div>{value.pur_num * 22}吨</div>
            </div>
            <div className={Styles.thirdParty}>
              <div>单价</div>
              <div>{value.pur_price}元/吨</div>
            </div>
            <div className={Styles.thirdParty}>
              <div>总计</div>
              <div>{value.total_price}元</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderList(value, index) {
    return (
      <div className={Styles.listContainer} key={index}>
        <WingBlank>
          <div className={Styles.block}>
            {
              value.order_state === 0 || value.order_state === 5 ? this.renderNoPicture(value) : this.renderHavePicture(value)
            }
            <div>
              {
                value.order_state == '1' // 待付款
                  ? (
                    <div className={Styles.option}>
                      <div className={Styles.service} onClick={() => this.onClickJumpToService(value)}>客服</div>
                    </div>
                  ) : ''
              }
              {
                value.order_state == 4 // 已完成4
                  ? (
                    <div className={Styles.option}>
                      <div className={Styles.delete} onClick={() => this.cancel(value.id)}>删除</div>
                    </div>
                  ) : ''
              }
              {
                value.order_state == '3' // 自动结算
                  ? (
                    <div className={Styles.option + ' ' + Styles.optionEvaluate}>
                      <div className={Styles.evaluate} onClick={() => this.evaluate(value)}>评价</div>
                    </div>
                  ) : ''
              }
              {
                value.order_state == '5' || value.order_state === '6' // 已失效5;已关闭6;
                  ? (
                    <div className={Styles.option}>
                      {/* <div className={Styles.service} onClick={() => this.onClickJumpToService(value)}>客服</div> */}
                      <div className={Styles.delete} onClick={() => this.cancel(value.id)}>删除</div>
                    </div>
                  ) : ''
              }
              {
                value.order_state == '0' // 待签约
                  ? (
                    <div className={Styles.option}>
                      <div className={Styles.service} onClick={() => this.onClickJumpToService(value)}>客服</div>
                      <div className={Styles.sign} onClick={() => this.jumpContract(value)}>签约</div>
                      <div className={Styles.cancel} onClick={() => this.cancel(value.id)}>取消</div>
                    </div>
                  ) : ''
              }
              {
                value.order_state == '2' // 待结算
                  ? (
                    <div className={Styles.option}>
                      <div className={Styles.transport} onClick={() => this.jumpToTransport(value)}>运输状态</div>
                      <div className={Styles.service} onClick={() => this.onClickJumpToService(value)}>客服</div>
                      <div className={Styles.account} onClick={() => this.jumpAccount(value)}>确认结算</div>
                      <div className={Styles.cancel} onClick={() => this.cancel(value.id)}>取消</div>
                    </div>
                  ) : ''
              }

            </div>
          </div>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    );
  }

  render() {
    const list = this.props.myOrder.orderList.orderList;
    return (
      <div className={Styles.myOrder}>
        <Helmet>
          <title>我的订单</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.tab}>
          <Tabs values={['全部', '待签约', '待付款', '待结算', '待评价']} onChange={this.changeTab} selectedIndex={this.state.tab} />
        </div>
        <div className={Styles.contain}>
          {
            list.length > 0 ? list.map((value, index) => this.renderList(value, index)) : ''
          }
        </div>
        <div className={Styles.loadMore} ref="wrapper">
          {
            this.props.myOrder.total > current * this.state.pageSize
              ? <Spin />
              : '已加载完全部'
          }
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 发布供应
    orderList: bindActionCreators(orderList, dispatch),
    // 清空数据
    clearData: bindActionCreators(clearData, dispatch),
    // 取消或者删除订单
    cancelSuccess: bindActionCreators(cancelSuccess, dispatch),
    cancelError: bindActionCreators(cancelError, dispatch),
    // 生成订单
    createSuccess: bindActionCreators(createSuccess, dispatch),
    createError: bindActionCreators(createError, dispatch),
    // 签署合同
    contractSuccess: bindActionCreators(contractSuccess, dispatch),
    contractError: bindActionCreators(contractError, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    myOrder: state.get('myOrder', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'myOrder', reducer });
const withSaga = injectSaga({ key: 'myOrder', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyOrder);
