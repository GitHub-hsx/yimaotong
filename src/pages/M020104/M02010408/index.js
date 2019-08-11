/*
 * @Description: 我的订单结算页
 * @Author: your name
 * @Date: 2019-07-28 11:33:51
 * @LastEditTime: 2019-08-04 10:15:17
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
} from 'antd-mobile';
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

class WeightNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  // 关闭弹窗
  onClickClosePopUp = () => {
    this.props.popup();
  }

  render() {
    return (
      <div className={Styles.weightNote}>
        <Helmet>
          <title>查看磅单</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace size="lg" />
        <div>
          <WhiteSpace size="lg" />
          <WingBlank>
            <img src={sessionStorage.getItem('memo')} alt="磅单" />
          </WingBlank>
        </div>
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
    weightNote: state.get('weightNote', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'weightNote', reducer });
const withSaga = injectSaga({ key: 'weightNote', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WeightNote);
