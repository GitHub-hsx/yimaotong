/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-07-12 19:16:18
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import {
  TitleDisplay,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  addAssociateAccount,
} from './redux/actions';
import Styles from './style.less';

class TopMessageDetail extends Component {
  componentDidMount() {
  }


  render() {
    const msg = this.props.information.list.records;
    return (
      <div className={Styles.informationDetail}>
        <Helmet>
          <title>气质报告</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: msg[this.props.location.id].content }} />
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
    mHome: state.get('mHome').toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'topMessageDetail', reducer });
const withSaga = injectSaga({ key: 'topMessageDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TopMessageDetail);
