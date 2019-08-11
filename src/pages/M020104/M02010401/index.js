/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-10 12:11:44
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
  List,
  ListItem,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import history from 'utils/history';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 发布供应
  businessSupply,
} from './redux/actions';
import Styles from './style.less';
import PayHome from '../../M020101/M02010101/Loadable'; // 易交易首页
import {
  noPhoto,
  arrow,
  toSignUp,
  toPay,
  account,
  evaluate,
} from '../../../assets/picture.js';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
const Item = List.Item;

class PayPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  }

  componentDidMount() {

  }

  // 跳转至我的订单
  jumpToOrder = () => {
    history.push('/M020104/02');
  }

  // 跳转个人资料
  onClickDetailMessage = () => {
    history.push('/M010201/02');
  }

  // 跳转认证信息
  jumpIdentification = () => {
    history.push('/M020105/01');
  }

  // 客服
  chat = () => {
    window.Jockey.send('ymt_im', {
      customerServiceID: 'iostest10291',
    });
  }

  onClickPress = () => {
    // alert('11');
  }

  render() {
    const msg = JSON.parse(localStorage.getItem('loginChange') ? localStorage.getItem('loginChange') : localStorage.getItem('login'));
    const customMSg = msg.picPath ? msg.picPath : '';
    let photo = '';
    if (customMSg === '') {
      photo = noPhoto;
    } else if (customMSg.substring(0, 4) == 'http') {
      photo = customMSg;
    } else {
      photo = IMG_NAME_BASE_URL + customMSg;
    }
    const bgPhoto = {
      backgroundImage: 'url(' + photo + ')',
    };
    return (
      <div className={Styles.payPersonal}>
        <Helmet>
          <title>发布供应</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.personal}>
          <div className={Styles.photo}>
            <div style={bgPhoto} />
          </div>
          <div className={Styles.introduction} onClick={this.onClickDetailMessage}>
            <div className={Styles.basic}>
              <div className={Styles.name}>{msg.nickname}</div>
              <div className={Styles.company}>&nbsp;{msg.company !== '' ? msg.company : '保密'}</div>
              <div className={Styles.job}>&nbsp;{msg.post === '' ? '保密' : msg.post}</div>
            </div>
            <div className={Styles.arrow}>
              <WingBlank>
                <img src={arrow} alt="" />
              </WingBlank>
            </div>
          </div>
        </div>
        <div className={Styles.tabBar}>
          <List className="my-list">
            <ListItem
              arrow="horizontal"
              extra="我的订单"
              multipleLine={false}
              onClick={this.jumpToOrder}
            >
            </ListItem>
          </List>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
            tabBarPosition="top"
          >
            <TabBar.Item
              title="待签约"
              key="待签约"
              icon={(
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + toSignUp + ' ) center center /  21px 21px no-repeat',
                }}
                />
              )
              }
              badge={1}
              onPress={this.onClickPress}
              data-seed="logId"
            >
            </TabBar.Item>
            <TabBar.Item
              title="待付款"
              key="待付款"
              icon={(
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + toPay + ') center center /  21px 21px no-repeat',
                }}
                />
              )
              }
              badge={1}
              onPress={this.onClickPress}
              data-seed="logId"
            >
            </TabBar.Item>
            <TabBar.Item
              icon={(
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + account + ') center center /  21px 21px no-repeat',
                }}
                />
              )}
              title="待结算"
              key="待结算"
              dot
              onPress={this.onClickPress}
            >
            </TabBar.Item>
            <TabBar.Item
              icon={(
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + evaluate + ') center center /  21px 21px no-repeat',
                }}
                />
              )}
              title="待评价"
              key="待评价"
              onPress={this.onClickPress}
            >
            </TabBar.Item>
          </TabBar>
        </div>
        <WhiteSpace size="sm" />
        <div className={Styles.listItem}>
          <List className="my-list">
            <ListItem
              arrow="horizontal"
              extra="认证信息"
              multipleLine={false}
              onClick={this.jumpIdentification}
            >
            </ListItem>
            <ListItem
              arrow="horizontal"
              extra="客服中心"
              multipleLine={false}
              onClick={this.chat}
            >
            </ListItem>
            <ListItem
              arrow="horizontal"
              extra="我的翼币"
              multipleLine={false}
              onClick={() => {}}
            >
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 发布供应
    businessSupply: bindActionCreators(businessSupply, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    payPersonal: state.get('payPersonal', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'payPersonal', reducer });
const withSaga = injectSaga({ key: 'payPersonal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PayPersonal);
