import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  listenTokenAction,
  listenFaceAction,
  listenSeqAction,
  listenScanAction,
  listenMesAction,
  listenFunction,
} from '../globalActions';

/**
 * 客户端交互容器
 */
class CommunicateContainer extends Component {
  componentDidMount() {
    if (window.Jockey) {
      // 监听 人脸识别
      window.Jockey.on('faceListener', (payload, complete) => {
        // this.props.listenScanAction(payload);
      });
      // 监听 数字键盘
      window.Jockey.on('keyboardListener', (payload, complete) => {
        // this.props.listenScanAction(payload);
      });
      // 监听 token 请求 从客户端获取 sessionId 头部信息
      window.Jockey.on('tokenListener', (payload, complete) => {
        this.props.listenTokenAction(payload);
      });
      // 监听 seq 数据(从客户端获取请求接口次数)
      window.Jockey.on('seqListener', (payload, complete) => {
        this.props.listenSeqAction(payload);
      });
      // 监听 扫码回调请求
      window.Jockey.on('scanListener', (payload, complete) => {
        this.props.listenScanAction(payload);
      });
      // 监听 联系人请求
      window.Jockey.on('linkmanListener', (payload, complete) => {
      });
      // 监听 相册请求
      window.Jockey.on('albumListener', (payload, complete) => {
      });
      // 监听 相机请求
      window.Jockey.on('cameraListener', (payload, complete) => {
      });
      // 监听 密码弹窗反馈
      window.Jockey.on('passwordListener', (payload, complete) => {
      });
      // 监听 下拉框反馈数据
      window.Jockey.on('selectListener', (payload, complete) => {
      });
      // 监听 客户端调用h5传参
      window.Jockey.on('addressBook', (payload, complete) => {
        this.props.listenMesAction(payload);
      });
      // 监听 客户端调用h5传参
      window.Jockey.on('functionBook', (payload, complete) => {
        this.props.listenFunction(payload);
      });
    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="global-listener">
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export function mapDispatchToProps(dispatch) {
  return {
    listenTokenAction: bindActionCreators(listenTokenAction, dispatch),
    listenFaceAction: bindActionCreators(listenFaceAction, dispatch),
    listenSeqAction: bindActionCreators(listenSeqAction, dispatch),
    listenScanAction: bindActionCreators(listenScanAction, dispatch),
    listenMesAction: bindActionCreators(listenMesAction, dispatch),
    listenFunction: bindActionCreators(listenFunction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunicateContainer);
