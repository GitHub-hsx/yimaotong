/*
 * @Description: 翼知讯（行情）
 * @Author: 郝媛媛
 * @Date: 2019-07-03 21:14:34
 * @LastEditTime: 2019-08-10 12:02:11
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace, Button, WingBlank,
} from 'antd-mobile';
import {
  TitleDisplay,
  BottomBar,
  List,
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
  popup,
  update,
} from './redux/actions';
import Styles from './style.less';


class ChangeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.location.index,
      nickName: '', // 姓名
      company: '', // 公司
      post: '', // 职务
    };
  }

  onChangeNickName = (e) => {
    this.setState({
      nickName: e.target.value,
    });
  }

  onClickClosePopUp=() => {
    this.props.popup();
    if (this.props.changeMessage.errorMsg.indexOf('修改成功') !== -1) {
      this.props.history.go(-2);
    }
  }

  // 修改公司名
  onChangeCompany = (e) => {
    this.setState({
      company: e.target.value,
    });
  }

  // 修改职务
  onChangePost = (e) => {
    this.setState({
      post: e.target.value,
    });
  }

  // 提交修改信息
  submitMsg = () => {
    const message = {
      company: this.state.company,
      memberId: '1',
      nickName: this.state.nickName,
      post: this.state.post,
    };
    this.props.update(message);
  }

  render() {
    return (
      <div className={Styles.setting}>
        <Helmet>
          {
            this.state.index == '1' ? <title>修改姓名</title> : ''
          }
          {
            this.state.index == '2' ? <title>修改公司</title> : ''
          }
          {
            this.state.index == '3' ? <title>修改职务</title> : ''
          }
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <WhiteSpace />
        <div className={Styles.content}>
          <List>
            {
              this.state.index == '1'
                ? (
                  <ListItem
                    arrow=""
                    extra="姓名"
                    multipleLine={false}
                    onClick={() => {}}
                  ><Input placeholder="请输入姓名" maxLength="10" value={this.state.nickName} onChange={(e) => this.onChangeNickName(e)} />
                  </ListItem>
                ) : ''
            }
            {
              this.state.index == '2'
                ? (
                  <ListItem
                    arrow=""
                    extra="公司"
                    multipleLine={false}
                    onClick={() => {}}
                  ><Input placeholder="请输入公司名称" maxLength="60" value={this.state.company} onChange={(e) => this.onChangeCompany(e)} />
                  </ListItem>
                ) : ''
            }
            {
              this.state.index == '3'
                ? (
                  <ListItem
                    arrow=""
                    extra="职务"
                    multipleLine={false}
                    onClick={() => {}}
                  ><Input placeholder="请输入职务" maxLength="60" value={this.state.post} onChange={(e) => this.onChangePost(e)} />
                  </ListItem>
                ) : ''
            }
          </List>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button type="primary" style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.submitMsg}>保存</Button>
        </WingBlank>
        {
          this.props.changeMessage.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.changeMessage.errorMsg}
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
    update: bindActionCreators(update, dispatch),
    popup: bindActionCreators(popup, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    global: state.get('global').toJS(),
    changeMessage: state.get('changeMessage', initialState).toJS(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'changeMessage', reducer });
const withSaga = injectSaga({ key: 'changeMessage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangeMessage);
