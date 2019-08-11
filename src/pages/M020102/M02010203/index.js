/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-11 22:09:43
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import {
  formaMoney,
} from 'utils/commonFunction';
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace,
  WingBlank,
  Button,
} from 'antd-mobile';
import {
  List,
  ListItem,
  Input,
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
} from './redux/actions';
import Styles from './style.less';
import {
  noPhoto,
} from '../../../assets/picture';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

class CustomerChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: JSON.parse(sessionStorage.getItem('detail')),
    };
  }

  componentDidMount() {
  }

  // 供应
  listRenderMine(value) {
    return (
      <div>
        <div className={Styles.list}>
          <WingBlank size="lg">
            <div className={Styles.content}>
              <div className={Styles.line}>
                <div className={Styles.left}>供应商：{value.entName}</div>
                <div className={Styles.right}>
                  {
                    value.pubDatetime ? (value.pubDatetime.substring(0, 10) + ' ' + value.pubDatetime.substring(value.pubDatetime.length - 8, value.pubDatetime.length - 3)) : ''
                  }
                </div>
              </div>
              <div className={Styles.line}>
                <strong className={Styles.left}>LNG： {value.num}车</strong>
                <strong className={Styles.right}>{formaMoney(22)}元/吨</strong>
              </div>
              <div className={Styles.line}>

                <div className={Styles.left}>
                     装车时间：{ value.pubDate ? value.pubDate.substring(0, 10).replace(/-/g, '') : ''}
                </div>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>液原厂：{value.factory}</div>
                <div className={Styles.right}>
                </div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
      </div>
    );
  }

  // 我的采购
  PurchaseMine(value) {
    return (
      <div>
        <div className={Styles.list}>
          <WingBlank size="lg">
            <div className={Styles.content}>
              <div className={Styles.line}>
                <div className={Styles.left}>采购商：{value.entName}</div>
                <div className={Styles.right}>{value.pubDate ? (value.pubDate.substring(0, 10) + ' ' + value.pubDate.substring(value.pubDate.length - 8, value.pubDate.length - 3)) : ''}</div>
              </div>
              <div className={Styles.line}>
                <strong className={Styles.left}>LNG： {value.num}车</strong>
                <strong className={Styles.right}></strong>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货地址： {value.address}</div>
                <strong className={Styles.clearMargin + ' ' + Styles.right}>{value.isOffer == '0' ? '等待报价中' : '报价已完成'}</strong>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货时间：{ value.date ? value.date.substring(0, 10).replace(/-/g, '') : ''}</div>
                <div className={Styles.right}>
                </div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
      </div>
    );
  }

  renderList() {
    const photo = {
      backgroundImage: 'url(' + noPhoto + ')',
    };
    return (
      <div className={Styles.customerList}>
        <div className={Styles.container}>
          <div className={Styles.photo}>
            <div style={photo} />
          </div>
          <div>ssss</div>
        </div>
      </div>
    );
  }


  render() {
    const {
      detail,
    } = this.state;
    return (
      <div className={Styles.customerChoose}>
        <Helmet>
          <title>请选择</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <div className={Styles.topBar}>
          <div className={Styles.list}>
            {/* {
              detail.type == '1'
                ? this.PurchaseMine(detail) // 采购
                : this.listRenderMine(detail) // 供应
            } */}
          </div>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            {this.renderList()}
          </WingBlank>
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 订单生成
    businessSupply: bindActionCreators(businessSupply, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    evaluate: state.get('customerChoose', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'customerChoose', reducer });
const withSaga = injectSaga({ key: 'customerChoose', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CustomerChoose);
