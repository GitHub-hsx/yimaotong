/*
 * @Description: 我的订单结算页
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-04 10:18:25
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
  Steps,
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
import {
  circleFill,
  circle,
} from '../../../assets/picture';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const Step = Steps.Step;

const customIcon = (status) => (
  <img src={status ? circle : circleFill} alt="" className="am-icon am-icon-md" />
);

class TransportStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: JSON.parse(sessionStorage.getItem('order')),
      member: 2,
    };
  }

  componentDidMount() {
    this.tmsStatus();
  }

  // 关闭弹窗
  onClickClosePopUp = () => {
    this.props.popup();
  }

  // 运输状态
  tmsStatus = () => {
    const message = {
      memberId: this.state.member,
      orderId: '20190720155850331',
    };
    this.props.contract(message);
  }

  // 查看榜单
  jumpToLook = (value) => {
    sessionStorage.setItem('memo', value);
    this.props.history.push('/M020104/08');
  }


  render() {
    const {
      status,
    } = this.props.transportStatus;
    return (
      <div className={Styles.transportStatus}>
        <Helmet>
          <title>合同详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace size="lg" />
        <div>
          <WhiteSpace size="lg" />
          <WingBlank>
            <Steps current={1}>
              {
                status.length > 0
                  ? status.map((value, index) => <Step title={value.timei} icon={customIcon(index + 1 === status.length)} description={<div className={Styles.description}><div>{value.description}</div>{value.memo !=='' ? <div onClick={() => this.jumpToLook(value.memo)}>查看榜单</div> : ''}</div>} />)
                  : ''
              }

            </Steps>
          </WingBlank>
        </div>
        {
          this.props.transportStatus.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.transportStatus.errorMsg}
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
    transportStatus: state.get('transportStatus', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'transportStatus', reducer });
const withSaga = injectSaga({ key: 'transportStatus', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransportStatus);
