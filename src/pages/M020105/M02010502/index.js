/*
 * @Description: 易交易信息页信息详情
 * @Author: your name
 * @Date: 2019-07-14 14:34:58
 * @LastEditTime: 2019-08-10 20:46:38
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
  ImagePicker,
  Toast,
} from 'antd-mobile';
import {
  List,
  ListItem,
  Input,
  Verification,
  Loading,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import {
  formaMoney,
  getSeq,
} from 'utils/commonFunction';
import createRequestBody from 'utils/createBody';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 抢购
  batchUpload,
  popup, // 弹窗控制
  // 图片批量上传
  batchUploadSuccess,
  batchUploadError,
} from './redux/actions';
import Styles from './style.less';
import {
  add,
  noPhoto,
} from '../../../assets/picture';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/file/upload';
const alert = Modal.alert;

class IdentifyTips extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  onClickClosePopUp = () => {
    this.props.popup();
  }

  // 选择地址
  chooseAddress = () => {
  }

  // 返回
  goBack = () => {
    this.props.history.go(-1);
  }

  render() {
    return (
      <div className={Styles.identifyTips}>
        <Helmet>
          <title>详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WingBlank>
            <div className={Styles.bgColor}>
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />

              <WingBlank size="lg">
                <WingBlank size="lg">
                  <div>
                    <div className={Styles.tips}>您已提交认证申请</div>
                    <div className={Styles.day}>1-3个工作日内，工作人员会与您取得联系核对相关信息，如有疑问请联系客服
                    </div>
                  </div>
                </WingBlank>
              </WingBlank>
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
            </div>
          </WingBlank>
        </div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <WingBlank size="lg">
            <WingBlank size="lg">
              <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.goBack}>返回</Button>
            </WingBlank>
          </WingBlank>
        </WingBlank>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // batchUpload: bindActionCreators(batchUpload, dispatch),
    popup: bindActionCreators(popup, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    identifyTips: state.get('identifyTips', initialState).toJS(),
    // payMessage: state.get('payMessage').toJS(),
    global: state.get('global').toJS(),
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'identifyTips', reducer });
const withSaga = injectSaga({ key: 'identifyTips', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IdentifyTips);
