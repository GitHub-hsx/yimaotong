/*
 * @Description: 发布采购
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-10 11:48:52
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
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 发布供应
  businessSupply,
  // 关闭弹窗
  popup,
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purAddress: '', // 卸货地址
      purDate: now, // 到货日期
      purNum: 500, // 采购量
      entId: 0, // 供应企业id
      entName: '', // 供应企业名称
      memberId: 0, // 会员ID
      positionX: '', // 地址纬度
      positionY: '', // 地址经度
    };
  }

  componentDidMount() {
    const {
      entAuth,
    } = this.props.payHome;
    this.setState({
      entId: entAuth.entBh, // 采购企业id
      entName: entAuth.entTitle, // 采购企业名称
      memberId: '1', // 会员ID
      positionX: '', // 地址纬度
      positionY: '', // 地址经度
      purAddress: '', // 卸货地址
      purNum: '', // 采购量（车）
    });
    window.Jockey.send('ymt_autoLocation', {}, (data) => {
      this.setState({
        positionX: data.longitude, // 地址纬度
        positionY: data.latitude, // 地址经度
        purAddress: data.address, // 卸货地址
      });
    });
  }

  // 调用发布供应的接口
  businessSupply = () => {
    const message = {
      entId: this.state.entId,
      entName: this.state.entName,
      memberId: this.state.memberId,
      positionX: this.state.positionX,
      positionY: this.state.positionY,
      purAddress: this.state.purAddress,
      purDate: this.state.purDate,
      purNum: this.state.purNum,
    };
    if (this.state.purNum === '') {
      Toast.info('请输入采购量', 1, null, true);
    } else if (this.state.entName === '') {
      Toast.info('请输入采购单位', 1, null, true);
    } else {
      this.props.businessSupply(message);
    }
  }

  onClickClosePopUp=() => {
    this.props.popup();
    if (this.props.purchase.errorMsg.indexOf('发布成功') !== -1) {
      this.props.history.push('/M020102/01');
    }
  }

  closePopup = () => {
    this.setState({
      popUpState: false,
    });
  }

  // 发布
  submit = () => {
    this.businessSupply();
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

  onChangePurNum = (value) => {
    this.setState({
      purNum: value.replace(/\D/g, ''),
    });
  }

  // 时间选择
  onChangeSupDate = (date) => {
    this.setState({
      purDate: date,
    });
  }

  onChangeEntName = (value) => {
    this.setState({
      entName: value,
    });
  }

  render() {
    return (
      <div className={Styles.purchase}>
        <Helmet>
          <title>发布采购</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <List className="date-picker-list">
          <InputItem
            placeholder="请输入采购单位"
            onChange={this.onChangeEntName}
            value={this.state.entName}
            clear
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
            onChange={(date) => this.onChangeSupDate(date)}
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
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.submit}>发布</Button>
        </WingBlank>
        {
          this.props.purchase.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.purchase.errorMsg}
              </Verification>
            )
            : null
        }
        {
          this.state.popUpState
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.closePopup}
                clicks={this.closePopup}
              >{this.state.popUpContent}
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
    // 发布供应
    businessSupply: bindActionCreators(businessSupply, dispatch),
    // 关闭弹窗
    popup: bindActionCreators(popup, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    purchase: state.get('purchase', initialState).toJS(),
    global: state.get('global').toJS(),
    payHome: state.get('payHome').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'purchase', reducer });
const withSaga = injectSaga({ key: 'purchase', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Purchase);
