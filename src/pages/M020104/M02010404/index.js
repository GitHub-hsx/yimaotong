/*
 * @Description: 我的订单签约
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-03 16:54:48
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

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: JSON.parse(sessionStorage.getItem('order')),
    };
  }

  componentDidMount() {

  }

  // 签约
  contract = () => {
    const message = {};
    this.props.contract(message);
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
        <div></div>
        <div></div>
        <div className={Styles.option}>
          <div className={Styles.service}>客服</div>
          <div className={Styles.sign} onClick={this.contract}>签约</div>
          <div className={Styles.cancel}>取消</div>
        </div>
        {
          this.props.orderRate.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.orderRate.errorMsg}
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
    orderRate: state.get('contract', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'contract', reducer });
const withSaga = injectSaga({ key: 'contract', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Contract);
