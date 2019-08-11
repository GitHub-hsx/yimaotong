/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-11 17:56:14
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
  popup,
} from './redux/actions';
import Styles from './style.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Supply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entId: '', // 供应企业id
      entName: '', // 供应企业名称
      memberId: '', // 会员ID
      positionX: '', // 地址纬度
      positionY: '', // 地址经度
      supAddress: '', // 卸货地址
      supDate: now, // 装车日期
      supFactory: '', // 液源厂
      supNum: '', // 供货量（车）
      supPrice: '', // 单价
      popUpState: false,
      popUpContent: '',
    };
    console.log(this.props);
  }

  componentDidMount() {
    const {
      entAuth,
    } = this.props.payHome;
    this.setState({
      entId: entAuth.entBh, // 供应企业id
      entName: entAuth.entTitle, // 供应企业名称
      memberId: '1', // 会员ID
      // positionX: 0, // 地址纬度
      // positionY: 0, // 地址经度
      supAddress: '', // 卸货地址
      supFactory: '', // 液源厂
      supNum: '', // 供货量（车）
      supPrice: '', // 单价
    });
  }

  // 供应单位
  onChangeEntName = (value) => {
    this.setState({
      entName: value,
    });
  }

  // 供货量
  onChangeSupNum = (value) => {
    this.setState({
      supNum: value,
    });
  }

  // 单价
  onChangeSupPrice = (value) => {
    this.setState({
      supPrice: value,
    });
  }

  // 液原厂
  onChangeSupFactory = (value) => {
    this.setState({
      supFactory: value,
    });
  }

  onClickClosePopUp=() => {
    this.props.popup();
    if (this.props.supply.errorMsg.indexOf('发布成功') !== -1) {
      this.props.history.push('/M020102/01');
    }
  }

  closePopup = () => {
    this.setState({
      popUpState: false,
    });
  }

  // 时间选择
  onChangeSupDate = (date) => {
    this.setState({
      supDate: date,
    });
  }

  // 调用发布供应的接口
  businessSupply = () => {
    const message = {
      entId: this.state.entId,
      entName: this.state.entName,
      memberId: this.state.memberId,
      positionX: '',
      positionY: '',
      supAddress: '',
      supDate: this.state.supDate,
      supFactory: this.state.supFactory,
      supNum: this.state.supNum,
      supPrice: this.state.supPrice,
    };
    this.props.businessSupply(message);
  }

  // 发布
  submit = () => {
    if (this.state.supNum === '') {
      Toast.info('请输入供货量', 1, null, true);
    } else if (this.state.supPrice === '') {
      Toast.info('请输入单价', 1, null, true);
    } else if (this.state.supFactory === '') {
      Toast.info('请输入液原厂', 1, null, true);
    } else {
      this.businessSupply();
    }
  }

  render() {
    return (
      <div className="supply">
        <Helmet>
          <title>发布供应</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <List className="date-picker-list">
          <InputItem
            placeholder="请输入供应单位"
            value={this.state.entName}
            onChange={this.onChangeEntName}
          >供应单位
          </InputItem>
          <InputItem
            clear
            value={this.state.supNum}
            placeholder="请输入供货量"
            onChange={this.onChangeSupNum}
            extra="车"
          >供货量
          </InputItem>
          <InputItem
            clear
            value={this.state.supPrice}
            placeholder="请输入供货量"
            onChange={this.onChangeSupPrice}
            extra="元/吨"
          >单价
          </InputItem>
          <DatePicker
            value={this.state.supDate}
            onChange={(date) => this.onChangeSupDate(date)}
          >
            <List.Item arrow="horizontal">装车时间</List.Item>
          </DatePicker>
          <InputItem
            clear
            placeholder="请输入液原厂"
            maxLength="100"
            onChange={this.onChangeSupFactory}
          >液原厂
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.submit}>发布</Button>
        </WingBlank>
        {
          this.props.supply.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.supply.errorMsg}
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
    supply: state.get('supply', initialState).toJS(),
    payHome: state.get('payHome').toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'supply', reducer });
const withSaga = injectSaga({ key: 'supply', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Supply);
