/*
 * @Description: 我的订单结算页
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-03 20:09:01
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
  // 订单结算
  contract,
  // 弹窗关闭
  popup,
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: JSON.parse(sessionStorage.getItem('order')),
    };
  }

  componentDidMount() {

  }

  // 关闭弹窗
  onClickClosePopUp = () => {
    if (this.props.account.errorMsg.indexOf('订单结算成功') !== 0) {
      this.props.history.go(-1);
    }
    this.props.popup();
  }

  // 结算
  contract = () => {
    const message = {
      id: this.state.list.id, // 订单id
      realAmount: this.state.list.real_amount, // 结算金额
      realNum: this.state.list.real_num, // 结算数量
    };
    this.props.contract(message);
  }

  render() {
    return (
      <div className={Styles.account}>
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
              <div>等待买家结算</div>
              <div>
                <div>剩29分59秒订单关闭</div>
                <div>若超出时间买家未结算，系统自动划款</div>
              </div>
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
        <WhiteSpace />
        <div className={Styles.tips + ' ' + Styles.bgColor}>
          <WingBlank size="lg">
            <div className={Styles.amount}>
              <div>实际重量</div>
              {
                this.state.list.real_num !== ''
                  ? <div>{this.state.list.real_num}元</div>
                  : ''
              }
            </div>
          </WingBlank>
        </div>
        <div className={Styles.tips + ' ' + Styles.bgColor}>
          <WingBlank size="lg">
            <div className={Styles.amount}>
              <div>实际金额</div>
              {
                this.state.list.real_amount !== ''
                  ? <div>{this.state.list.real_amount}元</div>
                  : ''
              }
            </div>
          </WingBlank>
        </div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <div className={Styles.option}>
          <div className={Styles.service} onClick={() => this.onClickJumpToService(this.state.list)}>客服</div>
          <div className={Styles.sign} onClick={() => this.contract(this.state.list)}>结算</div>
          <div className={Styles.cancel}>取消</div>
        </div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        {
          this.props.account.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.account.errorMsg}
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
    account: state.get('account', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'account', reducer });
const withSaga = injectSaga({ key: 'account', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Account);
