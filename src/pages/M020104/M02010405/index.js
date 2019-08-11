/*
 * @Description: 我的订单待付款客服页
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-10 13:20:05
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
} from 'antd-mobile';
import {
  Grade,
  Verification,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 合同签约
  contract,
  // 弹窗关闭
  popup,
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: JSON.parse(sessionStorage.getItem('order')),
    };
  }

  componentDidMount() {

  }

  // 客服
  chat = () => {
    window.Jockey.send('ymt_im', {
      customerServiceID: 'iostest10291',
    });
  }

  render() {
    return (
      <div className={Styles.orderRate}>
        <Helmet>
          <title>合同详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <div className={Styles.tips + ' ' + Styles.bgColor}>
          <WingBlank size="lg">
            <div className={Styles.topTips}>
              <div>等待买家付款</div>
              <div>剩29分59秒订单关闭</div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
        <div className={Styles.supMessage + ' ' + Styles.bgColor}>
          <WingBlank size="lg">
            <div className={Styles.content}>
              <div className={Styles.orderID}>
                <div>{this.state.list.orderid}</div>
                <div>{this.state.list.order_time}</div>
              </div>
              <div>供应商：{this.state.list.sup_ent}</div>
              <div className={Styles.supNum}>
                <div>供应量：</div>
                <div>{this.state.list.pur_num}车</div>
                <div>{this.state.list.pur_price}元/吨</div>
                <div></div>
              </div>
              <div>液原厂:{this.state.list.sup_factory}</div>
              <div>装车时间:{this.state.list.sup_date.substring(0, 10)}</div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
        <div className={Styles.supMessage + ' ' + Styles.bgColor}>
          <WingBlank size="lg">
            <div className={Styles.content}>
              <div>采购单位：{this.state.list.pur_ent}</div>
              <div className={Styles.supNum}>
                <div>供应量：</div>
                <div>{this.state.list.pur_num}车</div>
                <div>{this.state.list.pur_price}元/吨</div>
                <div></div>
              </div>
              <div>卸货地址:{this.state.list.pur_address}</div>
              <div>卸车时间:{this.state.list.pur_date}</div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
        <div className={Styles.tips + ' ' + Styles.bgColor}>
          <WingBlank size="lg">
            <div className={Styles.amount}>
              <div>预支付</div>
              <div>{this.state.list.total_price}元</div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace size="lg" />
        <div className={Styles.option}>
          <div className={Styles.service} onClick={this.chat}>客服</div>
        </div>
        {
          this.props.service.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.service.errorMsg}
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
    // 合同签约
    contract: bindActionCreators(contract, dispatch),
    // 弹窗关闭
    popup: bindActionCreators(popup, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    service: state.get('service', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'service', reducer });
const withSaga = injectSaga({ key: 'service', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Service);
