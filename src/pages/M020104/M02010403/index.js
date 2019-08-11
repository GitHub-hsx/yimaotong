/*
 * @Description: 我的订单评价
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-03 14:42:22
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
  // 订单评价
  evaluate,
  // 弹窗关闭
  popup,
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;

class OrderRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: 0, // 服务
      quality: 0, // 质量
      satisfy: 0, // 满意度
      order: '', // 评价内容
      list: {}, // 评价的订单数据
      memberId: '2', // 用户id
    };
  }

  componentDidMount() {
    this.setState({
      list: JSON.parse(sessionStorage.getItem('order')),
    });
  }

  onClickClosePopUp = () => {
    this.props.popup();
    this.props.history.go(-1);
  }

  // 服务评价
  serviceGrade = (grade) => {
    this.setState({
      service: grade,
    });
  }

  // 质量评价
  qualityGrade = (grade) => {
    this.setState({
      quality: grade,
    });
  }

  // 满意度评价
  satisfyGrade = (grade) => {
    this.setState({
      satisfy: grade,
    });
  }

  // 评价内容
  onChangeOrder = (e) => {
    this.setState({
      order: e.target.value,
    });
  }

  // 提交评价
  evaluate = () => {
    const message = {
      context: this.state.order,
      entId: this.state.sup_ent_id, // 企业id
      memberId: this.state.memberId,
      orderId: this.state.list.orderid,
      quality: this.state.quality,
      satisfaction: this.state.satisfy,
      service: this.state.service,
    };
    this.props.evaluate(message);
  }

  render() {
    return (
      <div className={Styles.orderRate}>
        <Helmet>
          <title>评价</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <div className={Styles.evaluate}>
          <WhiteSpace size="lg" />
          <WingBlank size="xs">
            <div className={Styles.card}>
              <div className={Styles.photo}>
                <div />
              </div>
              <div className={Styles.star}>
                <div>
                  <span>{this.state.list.sup_ent}</span>
                </div>
                <Grade name="服务" onChange={this.serviceGrade} />
                <Grade name="质量" onChange={this.qualityGrade} />
                <Grade name="满意度" onChange={this.satisfyGrade} />
              </div>
            </div>
            <WhiteSpace size="lg" />
            <WingBlank>
              <textarea placeholder="说说哪里满意吧" onChange={(e) => this.onChangeOrder(e)} />
            </WingBlank>
          </WingBlank>
          <WhiteSpace size="lg" />
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.evaluate}>评价提交</Button>
        </WingBlank>
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
    // 发布供应
    evaluate: bindActionCreators(evaluate, dispatch),
    // 弹窗关闭
    popup: bindActionCreators(popup, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    orderRate: state.get('orderRate', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'orderRate', reducer });
const withSaga = injectSaga({ key: 'orderRate', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrderRate);
