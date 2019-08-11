/*
 * @Description: 翼知讯（行情）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-08 21:23:59
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import {
  TitleDisplay,
  BottomBar,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  addAssociateAccount,
} from './redux/actions';
import Styles from './style.less';

class Market extends Component {
  componentDidMount() {
    this.props.addAssociateAccount({});
  }

  // 跳转至详情页面
  onClickJump = (index) => {
    this.props.history.push({
      pathname: '/M010103/02',
      id: index,
    });
  }

  listRender(value, index) {
    return (
      <div className={Styles.list} key={index} onClick={() => this.onClickJump(index)}>

        <WingBlank>
          <div className={Styles.message}>
            <div className={Styles.time}>{value.timei.substring(0, 10)}</div>
            <div className={Styles.title}>{value.title}</div>
          </div>
          <div className={Styles.describe}>
            <div>
            text-overflow是一个比较特殊的样式，我们可以用它代替我们通常所用的标题截取函数，而且这样做对搜索引擎更加友好，如：标题文件有50 个汉字...
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }

  render() {
    const { records } = this.props.market.list;
    return (
      <div className={Styles.market}>
        <Helmet>
          <title>行情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        {
          records.length > 0 ? records.map((value, index) => this.listRender(value, index)) : null
        }
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
    market: state.get('market', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'market', reducer });
const withSaga = injectSaga({ key: 'market', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Market);
