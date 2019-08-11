import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import className from 'classnames';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { dispatchMessage } from 'utils/communicate';
import {
  Button,
  WhiteSpace,
  Navbar,
  List,
  ListItem,
  Switch,
} from 'components';

import NprogressHOC from 'HigherOrderComponents/NprogressHOC';
import { getApiBase } from './redux/actions';
import { reposLoaded } from '~/globalActions';
import styles from './home.less';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'red',
    };
  }

  componentDidMount() {
    this.props.getApiBase({

    });
    window.Jockey.on('face', (payload, complete) => {
    });
    window.Jockey.on('faceUp', (payload, complete) => {
    });
  }

  defaultFuc= () => {

  }

  // h5调用客户端方法
  communicateWith = () => {
    window.Jockey.send('face', () => {
    });
    // 这里不考虑客户端了直接调用模拟方法
    this.simulateCallback();
  }

  // 模拟客户端方法 回调
  simulateCallback = () => {
    window.Jockey.triggerCallback(0);
  }

  // 模拟客户端主动调用
  simulateSend = () => {
    window.Jockey.trigger('faceUp', 1, {
      token: 'sjdildfikfhuaks',
      name: '1122',
    });
  }

  iOSCamera = () => {
    window.Jockey.send('face', () => {
    });
  }

  iOSPhotosAlbum = () => {
    window.Jockey.send('face', () => {
    });
  }

  jumpTo=() => {
    this.props.history.push('/simple');
  }

  changeTheme = () => {
    this.setState({
      theme: 'orange',
    });
  }

  render() {
    const cssStyle = className({
      [styles.App]: true,
    });
    return (
      <div className={cssStyle}>
        <Navbar
          className={styles.topBar}
          backgroundColor={this.state.theme}
          leftContent="左边"
          rightContent={<div onClick={this.changeTheme}>修改主题</div>}
        >
          home
        </Navbar>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/accountService/actualDeductListQuery">实施扣划</Link>
          <Button onClick={this.jumpTo} bgColor="red">点击跳转路由</Button>
        </nav>
        <List>
          <ListItem
            arrow="horizontal"
            extra="付款人姓名"
            multipleLine={false}
            onClick={() => {}}
          >
            测试账号
          </ListItem>
        </List>
        <div className={styles.content}>
          <Button onClick={this.communicateWith} bgColor="red">h5与客户端交互 拦截url模式</Button>
          <WhiteSpace size="xs" />
          <Button onClick={this.simulateSend}>模拟客户端主动调用</Button>
          <WhiteSpace size="xs" />
          <Button onClick={this.iOSCamera}>系统相机</Button>
          <WhiteSpace size="md" />
          <Button onClick={this.iOSPhotosAlbum}>系统相册</Button>
          <WhiteSpace size="lg" />
        </div>
        <footer className={styles.footer}>footer</footer>
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    getApiBase: bindActionCreators(getApiBase, dispatch),
    reposLoaded: bindActionCreators(reposLoaded, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    home: state.get('home', initialState),
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
