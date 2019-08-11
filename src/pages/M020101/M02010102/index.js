/*
 * @Description: 翼交易信息页
 * @Author: haoyuanyuan
 * @Date: 2019-07-06 17:02:03
 * @LastEditTime: 2019-08-06 22:06:54
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  banner,
} from './redux/actions';

import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;


class GasReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
      hidden: false,
      fullScreen: true,
      // 信息
      tab: 0,
      memberId: '2',
      pageSize: 5,
      isLoadingMore: false,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={Styles.gasReport}>
        <Helmet>
          <title>气质报告</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <img src={IMG_NAME_BASE_URL + this.props.payHome.gasReport.bgpic} alt="气质报告" />
      </div>
    );
  }
}


// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    global: state.get('global').toJS(),
    payHome: state.get('payHome').toJS(),
    gasReport: state.get('gasReport', initialState).toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'gasReport', reducer });
const withSaga = injectSaga({ key: 'gasReport', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GasReport);
