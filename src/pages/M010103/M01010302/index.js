/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-05 23:34:55
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

class MarketDetails extends Component {
  componentDidMount() {
    const message = {
      id: this.props.location.id,
    };
    this.props.addAssociateAccount(message);
  }


  render() {
    const msg = this.props.information.list.list;
    return (
      <div className={Styles.informationDetail}>
        <Helmet>
          <title>行情详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <WingBlank size="xs">
          <div dangerouslySetInnerHTML={{ __html: this.props.marketDetails.detail.content }} />
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    addAssociateAccount: bindActionCreators(addAssociateAccount, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    information: state.get('information').toJS(),
    marketDetails: state.get('marketDetails', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'marketDetails', reducer });
const withSaga = injectSaga({ key: 'marketDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MarketDetails);
