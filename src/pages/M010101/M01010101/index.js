/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 20:25:44
 * @LastEditTime: 2019-08-09 09:21:13
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 翼知讯（首页）
 * @author: 郝媛媛
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import {
  TitleDisplay,
  BottomBar,
  Tabs,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  addAssociateAccount,
  realTimeMessage,
} from './redux/actions';
import Styles from './style.less';
import Information from '../../M010102/M01010201/index';

class MHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  componentDidMount() {
    // this.props.addAssociateAccount({});
  }

  onClickJumpRealTime = () => {
    const msg = this.props.mHome.list;
    const message = {
      id: msg.id,
    };
    this.props.realTimeMessage(message);
  }

  // 切换tab标签
  changeTabs = (e, index) => {
    if (index === '0') { // 推荐
      this.setState({
        newsType: '3',
        tab: index,
      }, () => {
        this.commonFunction();
      });
    } else if (index === '1') {
      this.setState({
        newsType: '3',
        tab: index,
      });
    }
  }

  renderNon() {
    const msg = this.props.mHome.list;
    return (
      <div className={Styles.mHome}>
        <Helmet>
          <title></title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.picture}></div>
        <div className={Styles.navContent}>
          <WhiteSpace size="md" />
          <div className={Styles.navBar}>
            <div>
              <div></div>
              <div>资讯</div>
            </div>
            <div>
              <div></div>
              <div>视频</div>
            </div>
            <div>
              <div></div>
              <div>行情</div>
            </div>
          </div>
        </div>
        <WhiteSpace />
        <div className={Styles.dailyMessage}>
          <TitleDisplay bar="red">每日行情</TitleDisplay>
          <WhiteSpace size="xs" />
          <WingBlank size="xs">
            <div className={Styles.realTimeMessage} onClick={this.onClickJumpRealTime}>
              <div className={Styles.block}>
                <div className={Styles.one}>
                  {
                    msg.timei ? msg.timei.substring(8, 10) : ''
                  }
                  <span>
                    {
                      msg.timei ? msg.timei.substring(0, 7) : ''
                    }
                  </span>
                </div>
                <div className={Styles.two}>
                  <div className={Styles.topTitle} dangerouslySetInnerHTML={{ __html: msg.title ? msg.title : '' }} />
                  <div className={Styles.originate}>--翼知讯</div>
                </div>
              </div>
            </div>
          </WingBlank>
          <WhiteSpace size="xs" />
        </div>
        <BottomBar
          onChange={this.changeTab}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={Styles.homeTotal}>
        <Helmet>
          <title></title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <Tabs values={['推荐', '视频', '行情', '国内', '国际', '政策']} onChange={this.changeTabs} selectedIndex={this.state.tab} />
          {
            this.state.tab == 0 ? <Information /> : ''
          }
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    addAssociateAccount: bindActionCreators(addAssociateAccount, dispatch),
    // 实时消息获取
    realTimeMessage: bindActionCreators(realTimeMessage, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    mHome: state.get('mHome', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'mHome', reducer });
const withSaga = injectSaga({ key: 'mHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MHome);
