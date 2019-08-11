import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import className from 'classnames';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import createRequestBody from 'utils/createBody';

import {
  Navbar,
  Button,
  WhiteSpace,
  Popup,
  BottomBar,
  Tabs,
} from 'components/index';

import { routes } from 'routes/routes.js';
// import NprogressHOC from 'HigherOrderComponents/NprogressHOC';
import { getApiBase } from './redux/actions';
import {
  login,
} from '~/globalActions';
import styles from './home.less';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';

import {
  icbc, // 中国工商银行
  abc, // 中国农业银行
  boc, // 中国银行
  ccb, // 中国建设银行
  bcm, // 交通银行
} from '../../assets/picture.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'red',
      data: {
        key: '1',
      },
      seq: 10000,
    };
  }

  componentDidMount() {
    if (window.Jockey) {
      window.Jockey.send('token', {
        id: 1,
      }, (json) => {
      });
    }
  }

  componentWillUnmount() {
    // localStorage.clear();
  }


  // 登录
  onSubmit= () => {
    localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJ1NjhtNGciLCJzdWIiOiIxODYxMjQ3NTExMiIsImV4cCI6MTU2NTQyODYyNiwiaWF0IjoxNTY0ODIzODI2fQ.I5feSoW4kr2F4qgOJjKItZX4IxzxgA01T3-Wnz70i30-4WA68xwV5jwvL6fGdVCdlQcPA896tVmfpZvPcp9ZUQ');
    // // 登录必要参数
    // const head = {
    //   deviceType: 'phone',
    //   softVersion: '1.8.9',
    //   osType: 'android',
    //   seq: '10000',
    //   type: 'login',
    // };
    // const message = {
    //   userAccount: 'sunxiaobing',
    //   password: '3B64B0588BB98DA57AC1260BC30861E6E84B46CA40DDE9603D4F0FB24D1184FDBA938FA8AB6596A9B234C0A550FF11D52AED30985D4829F4776CD730BB08D9372554A18A4F460390A6CC9AA710DB95BB4F82CF3106F965A3F9AAF40C4A56D64DEA1E78559B961E6A2A0DCB63D085C42B320019D7D8C2D4E742A4CB004DF1767E4DFAFC5E1B55BE9EC8F9224A13388D1CDAFD28DEDEB4AA90ADE4C5C890AE83A94EE183EB13F82B4EB64D43BC6036B38BD533CA714CDEC3C5F391A35FEBBB4803ED48E7CBB563FD1023534DCEFCEF4C00401A5952FDE29A54104CD42533A2C048C15B1D24A51693E706D5E3C353298B1F2EE43DAA0C03DB5098CF33241AA96E3C',
    //   os: 'Android',
    //   osVersion: '24',
    //   softVersion: '0.0.1',
    //   deviceId: '864447030808289',
    //   deviceType: 'phone',
    // };
    // // createRequestBody 构建登录参数的方法 每次条用 localStorage 中seq+1
    // this.props.login(createRequestBody(this.props.global.loginData, head, message));
  }

  getSeq = () => {
    if (window.Jockey) {
      window.Jockey.send('seq', {}, (seq) => {
        this.setState({
          seq: seq,
        });
      });
    }
  }

  changeTab = (e, index) => {
    if (index === 0) {
      this.setState({
        tab: index,
      });
    } else if (index === 1) {
      this.setState({
        tab: index,
      });
    } else if (index === 2) {
      this.setState({
        tab: index,
      });
    } else if (index === 3) {
      this.setState({
        tab: index,
      });
    } else {
      this.setState({
        tab: index,
      });
    }
  }

  // 根据客户端返回参数 构造接口
  getData = () => {
    const body = this.props.global.loginData;
    // 获取客户端seq 次数 构建请求
    if (window.Jockey) {
      window.Jockey.send('seq', {
        data: 1,
      }, (seq) => {
        body.head.seq = seq;
        body.head.type = '';
      });

      window.Jockey.send('seq', {
        data: 1,
      }, (seq) => {
      });
    }
  }

  // 未登录
  sendNotLogin = () => {
    if (window.Jockey) {
      window.Jockey.send('notLogin');
    }
  }

  //
  defaultFuc= () => {

  }

  render() {
    const cssStyle = className({
      [styles.App]: true,
    });
    const {
      userData,
    } = this.props.global;
    // console.log(routes);
    return (
      <div className={cssStyle}>
        <Helmet>
          <title>主页</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <Navbar
          className={styles.topBar}
          backgroundColor={this.state.theme}
          leftContent="左边"
          rightContent="..."
        >
          所有url
        </Navbar>
        <WhiteSpace size="xs" />
        <Button bgColor="red" onClick={this.onSubmit}>前端主动登录</Button>
        <WhiteSpace size="xs" />
        { JSON.stringify(this.props.global.loginData)}
        <div className={styles.list}>
          <ul className={styles.ul}>
            {routes.map((item, index) => (
              <li key={item.path} className={styles.li}>
                <h3>{item.title ? item.title : '默认'}：</h3>
                <strong><Link to={item.path}>{item.path}</Link></strong>
              </li>
            ))}
          </ul>
        </div>
        {this.props.global.modalShow.loginModal
          ? <Popup title1="header内容" title3="按钮1" title4="按钮2">{this.props.global.errorMessage}</Popup>
          : null
        }

        <WhiteSpace size="xs" />
        <Button bgColor="white" onClick={this.getData}>根据客户端参数请求接口</Button>
        <WhiteSpace size="xs" />
        <BottomBar
          describe={['返回', '首页', '圈子', '发布', '我的']}
          picture={[icbc, abc, boc, ccb, bcm]}
          onChange={this.changeTab}
        >
        </BottomBar>
        <Tabs values={['一周', '一个月', '三个月']} onChange={this.changeTab} selectedIndex={this.state.tab} />
        <WhiteSpace size="xs" />
        <Button bgColor="white" onClick={this.getSeq}>获取接口请求次数</Button>
        <WhiteSpace size="xs" />
        { JSON.stringify(this.state.seq)}

        <WhiteSpace size="xs" />
        <Button bgColor="white" onClick={this.sendNotLogin}>未登录</Button>
        <WhiteSpace size="xs" />
        <WhiteSpace size="xs" />
        <Button bgColor="white" onClick={this.onSubmit}>获取联系人</Button>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

// 向组件中注入action方法
function mapDispatchToProps(dispatch) {
  return {
    getApiBase: bindActionCreators(getApiBase, dispatch),
    login: bindActionCreators(login, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    home: state.get('home', initialState),
    global: state.get('global').toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
// const withNprogress = NprogressHOC();

export default compose(
  withReducer,
  withConnect,
  withSaga,
  // withNprogress
)(App);
