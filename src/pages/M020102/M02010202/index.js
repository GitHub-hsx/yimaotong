/*
 * @Description: 翼知讯（资讯）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 20:54:29
 * @LastEditTime: 2019-08-11 21:54:55
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
} from 'antd-mobile';
import {
  formaMoney,
} from 'utils/commonFunction';
import {
  List,
  ListItem,
  Input,
  Spin,
  Grade,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 评价列表
  businessSupply,
  // 企业综合评价
  overallEvaluate,
  // 清除list中的数据
  clear,
} from './redux/actions';
import Styles from './style.less';
import {
  starFull,
  noPhoto,
} from '../../../assets/picture';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL;

let current = 0;

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // detail: JSON.parse(sessionStorage.getItem('detail')),
      detail: '',
      pageSize: '5',
      isLoadingMore: false,
    };
  }


  componentDidMount() {
    // this.overallEvaluate(); // 企业综合评价
    // this.props.clear(); // 清除list中的数据
    // this.evaluateList(); // 评价列表请求

    
    const wrapper = this.refs.wrapper;
    const that = this; // 为解决不同context的问题
    let timeCount;
    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      const windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        that.loadMoreDataFn();
      }
    }

    window.addEventListener('scroll', () => {
      if (this.state.isLoadingMore) {
        return;
      }

      if (timeCount) {
        clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }, false);
  }

  // 下拉加载更多
  loadMoreDataFn = () => {
    this.evaluateList();
  }


  // 企业订单列表
  evaluateList = () => {
    current += 1;
    const message = {
      current: 0,
      entId: this.state.detail.entId,
      pageSize: 0,
    };
    this.props.businessSupply(message);
  }

  // 企业综合评价
  overallEvaluate = () => {
    const message = {
      id: JSON.parse(localStorage.getItem('login')).id,
    };
    this.props.overallEvaluate(message);
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
                <strong className={Styles.left}>LNG： {value.supNum}车</strong>
                <strong className={Styles.right}>{formaMoney(22)}元/吨</strong>
              </div>
              <div className={Styles.line}>

                <div className={Styles.left}>
                     装车时间：{ value.pubDatetime ? value.pubDatetime.substring(0, 10).replace(/-/g, '') : ''}
                </div>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>液原厂：{value.supFactory}</div>
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
                <div className={Styles.right}>{value.pubDate}</div>
              </div>
              <div className={Styles.line}>
                <strong className={Styles.left}>LNG： {value.purNum}车</strong>
                <strong className={Styles.right}></strong>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货地址： {value.purAddress}</div>
                <strong className={Styles.clearMargin + ' ' + Styles.right}>{value.isOffer == '0' ? '等待报价中' : '报价已完成'}</strong>
              </div>
              <div className={Styles.line}>
                <div className={Styles.left}>卸货时间：{value.purDate}</div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
      </div>
    );
  }


  render() {
    const {
      detail,
    } = this.state;
    // 企业头像
    const bgSty = {
      backgroundImage: 'url(' + noPhoto + ')',
    };
    // 星星背景
    return (
      <div className={Styles.evaluate}>
        <Helmet>
          <title>详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <div className={Styles.topBar}>
          <div className={Styles.list}>
            {/* {
              detail.supFactory
                ? this.listRenderMine(detail) // 供应

                : this.PurchaseMine(detail) // 采购
            } */}

            <div className={Styles.access}>
              <div className={Styles.photo}>
                <div style={bgSty} />
              </div>
              <div className={Styles.companyMsg}>
                <div className={Styles.name}></div>
                <div className={Styles.star}>
                  <Grade status={false} selectId={3} />
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>

            <div className={Styles.loadMore} ref="wrapper">
              {
                <Spin />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // 评价列表
    businessSupply: bindActionCreators(businessSupply, dispatch),
    // 企业综合评价
    overallEvaluate: bindActionCreators(overallEvaluate, dispatch),
    // 清除list中的数据
    clear: bindActionCreators(clear, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    evaluate: state.get('evaluate', initialState).toJS(),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'evaluate', reducer });
const withSaga = injectSaga({ key: 'evaluate', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Evaluate);
