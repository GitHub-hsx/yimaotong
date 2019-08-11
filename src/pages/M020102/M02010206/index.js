/*
 * @Description: 易交易信息页信息详情
 * @Author: your name
 * @Date: 2019-07-14 14:34:58
 * @LastEditTime: 2019-08-09 00:52:20
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import history from 'utils/history';
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace,
  WingBlank,
  Button,
  Modal,
  List,
  InputItem,
  DatePicker,
  Toast,
} from 'antd-mobile';
import {

  ListItem,
  Input,
  Verification,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import {
  formaMoney,
} from 'utils/commonFunction';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 抢购
  businessSupply,
  popup, // 弹窗控制
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class RunToSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '1',
      purId: '',
      supDate: now,
      supEntId: '',
      supEntName: '',
      supFactory: '',
      supPrice: '',
    };
  }

  componentDidMount() {
    const {
      entAuth,
    } = this.props.payHome;
    this.setState({
      supEntId: entAuth.entBh,
      supEntName: entAuth.entTitle,
      supFactory: entAuth.entTitle,
    });
  }

  onClickClosePopUp = () => {
    this.props.popup();
    if (this.props.runToSupply.errorMsg.indexOf('您的采购信息已提交') !== -1) {
      history.go(-1);
    }
  }

  // 报价
  businessSupply = () => {
    const msg = JSON.parse(sessionStorage.getItem('msg'));
    const message = {
      memberId: this.state.memberId, // 会员id
      purId: msg.id, // 采购ID
      supDate: this.state.supDate, // 装车时间
      supEntId: this.state.supEntId, // 供应企业id
      supEntName: this.state.supEntName, // 供应企业名称
      supFactory: this.state.supFactory, // 液源厂
      supPrice: this.state.supPrice, // 单价
    };
    if (this.state.supPrice === '') {
      Toast.info('请输入单价', 1, null, true);
    } else {
      this.props.businessSupply(message);
    }
  }

  onChangeSupPrice = (value) => {
    this.setState({
      supPrice: value,
    });
  }

  render() {
    const msg = JSON.parse(sessionStorage.getItem('msg'));
    return (
      <div className={Styles.runToPurchase}>
        <Helmet>
          <title>报价</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <List>
          <InputItem
            editable={false}
            value={msg.entName}
          >采购单位
          </InputItem>
          <InputItem
            editable={false}
            value={msg.purNum}
            extra="车"
          >采货量
          </InputItem>
          <InputItem
            editable={false}
            value={msg.pubDatetime.substring(0, 10)}
          >卸车时间
          </InputItem>
        </List>
        <WhiteSpace />
        <List>
          <InputItem
            editable={false}
            value={this.state.supEntName}
          >供应单位
          </InputItem>
          <InputItem
            placeholder="请输入单价"
            value={this.state.supPrice}
            onChange={this.onChangeSupPrice}
            extra="元/吨"
          >单价
          </InputItem>
          <DatePicker
            mode="date"
            value={this.state.supDate}
            onChange={(supDate) => this.setState({ supDate })}
          >
          </DatePicker>
          <InputItem
            editable={false}
            value={this.state.supFactory}
          >液原厂
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.businessSupply}>提交</Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        {
          this.props.runToSupply.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.runToSupply.errorMsg}
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
    businessSupply: bindActionCreators(businessSupply, dispatch),
    popup: bindActionCreators(popup, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    runToSupply: state.get('runToSupply', initialState).toJS(),
    // payMessage: state.get('runToSupply').toJS(),
    global: state.get('global').toJS(),
    payHome: state.get('payHome').toJS(),
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'runToSupply', reducer });
const withSaga = injectSaga({ key: 'runToSupply', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RunToSupply);
