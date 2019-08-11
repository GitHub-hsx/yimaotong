/*
 * @Description: 易交易信息页信息详情
 * @Author: your name
 * @Date: 2019-07-14 14:34:58
 * @LastEditTime: 2019-08-10 11:49:13
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
import history from 'utils/history';
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
const Item = List.Item;

class RunToPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: true,
      index: 0,
      memberId: '', // 会员ID
      positionX: '', // 地址纬度
      positionY: '', // 地址经度
      purAddress: '', // 卸货地址
      purDate: now, // 到货日期
      purEntId: 0, // 采购企业ID
      purEntName: '', // 采购企业名称
      purNum: '', // 采购量(单位车)
      supId: '', // 供应ID
      popUpState: false,
      popUpContent: '',
    };
  }

  componentDidMount() {
    const {
      entAuth,
    } = this.props.payHome;
    this.setState({
      memberId: '1', // 会员ID
      purEntId: entAuth.entBh, // 采购企业ID
      purEntName: entAuth.entTitle, // 采购企业名称
      purNum: '', // 采购量(单位车)
      supId: JSON.parse((sessionStorage.getItem('msg'))).id, // 供应ID
    });
    window.Jockey.send('ymt_autoLocation', {}, (data) => {
      this.setState({
        positionX: data.longitude, // 地址纬度
        positionY: data.latitude, // 地址经度
        purAddress: data.address, // 卸货地址
      });
    });
  }

  onClickClosePopUp = () => {
    this.props.popup();
    if (this.props.runToPurchase.errorMsg.indexOf('您的采购信息已提交') !== -1) {
      history.go(-1);
    }
  }

  // 选择卸货地址
  chooseAddress = () => {
    window.Jockey.send('ymt_map', {}, (data) => {
      this.setState({
        positionX: data.longitude, // 地址纬度
        positionY: data.latitude, // 地址经度
        purAddress: data.address, // 卸货地址
      });
    });
  }

  // 采购量
  onChangePurNum = (value) => {
    this.setState({
      purNum: value.replace(/\D/g, ''),
    });
  }

  // 采购单位
  onChangePuEntName = (value) => {
    this.setState({
      purEntName: value,
    });
  }

  // 抢购
  businessSupply = () => {
    const msg = JSON.parse(sessionStorage.getItem('msg'));
    const message = {
      memberId: this.state.memberId,
      positionX: this.state.positionX,
      positionY: this.state.positionY,
      purAddress: this.state.purAddress,
      purDate: this.state.purDate,
      purEntId: this.state.purEntId,
      purEntName: this.state.purEntName,
      purNum: this.state.purNum,
      supId: msg.id,
    };
    if (this.state.purNum === '') {
      Toast.info('请输入采购量', 1, null, true);
    } else {
      this.props.businessSupply(message);
    }
  }

  render() {
    const msg = JSON.parse(sessionStorage.getItem('msg'));
    return (
      <div className={Styles.runToPurchase}>
        <Helmet>
          <title>抢购</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <List className="date-picker-list">
          <InputItem
            editable={false}
            value={msg.entName}
          >供应单位
          </InputItem>
          <InputItem
            editable={false}
            value={msg.supNum}
            extra="车"
          >供货量
          </InputItem>
          <InputItem
            editable={false}
            value={formaMoney(msg.supPrice)}
            extra="元/吨"
          >单价
          </InputItem>
          <InputItem
            editable={false}
            value={msg.pubDatetime.substring(0, 10)}
          >装车时间
          </InputItem>
          <InputItem
            editable={false}
            value={msg.supFactory}
          >液原厂
          </InputItem>
        </List>
        <WhiteSpace />
        <div className={Styles.content}>
          <List>
            <InputItem
              clear
              placeholder="请输入采购单位"
              onChange={this.onChangePuEntName}
              value={this.state.purEntName}
            >采购单位
            </InputItem>
            <InputItem
              clear
              placeholder="请输入采购量"
              value={this.state.purNum}
              onChange={this.onChangePurNum}
              extra="车"
            >采购量
            </InputItem>
            <DatePicker
              value={this.state.purDate}
              onChange={(purDate) => this.setState({ purDate })}
            >
              <List.Item arrow="horizontal">到货日期</List.Item>
            </DatePicker>
            <InputItem
              editable={false}
              placeholder="自动获取"
              value={this.state.purAddress}
              onExtraClick={this.chooseAddress}
              extra={<div className={Styles.photo} />}
            >到货地址
            </InputItem>
          </List>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.businessSupply}>提交</Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        {
          this.props.runToPurchase.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.runToPurchase.errorMsg}
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
    runToPurchase: state.get('runToPurchase', initialState).toJS(),
    // payMessage: state.get('payMessage').toJS(),
    global: state.get('global').toJS(),
    payHome: state.get('payHome').toJS(),
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'runToPurchase', reducer });
const withSaga = injectSaga({ key: 'runToPurchase', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RunToPurchase);
