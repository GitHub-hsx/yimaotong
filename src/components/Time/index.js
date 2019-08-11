/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 00:33:33
 * @LastEditTime: 2019-08-11 01:15:44
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './whiteSpace.less';

/**
 * @author 郝媛媛
 * @param size {} 白条高度
 * @param prefixCls 默认class名称
 */
class Time extends Component {
  static defaultProps={
    prefixCls: 'time',
    size: 'md',
  }

  constructor(props) {
    super(props);
    this.state = {
      serviceTime: '',
      time: '',
      clock: '',
    };
  }

  componentDidMount() {
    this.setState({
      serviceTime: this.prop.serviceTime,
      time: this.props.time,
    }, () => {
      this.countDown();
    });
  }

  haveTime = (time) => {
    this.setState({
      clock: time,
    });
  }

  // 倒计时
  countDown = (serviceTime, time) => {
    time = '2019-08-11 00:30:00';
    serviceTime = '2019-08-11 00:40:00';
    // alert(serviceTime);
    const endTime = new Date(time.replace(/\-/g, '/'));
    const service = new Date(serviceTime.replace(/\-/g, '/'));
    let last = parseInt(endTime - service) + 30 * 60 * 1000;
    let clock = '';
    const timer = setInterval(() => {
      last -= 1000;
      const min = last / 1000 / 60 >= 1 ? Math.floor(last / 1000 / 60) : '00';
      const sec = last - min * 1000 * 60;
      const second = Math.floor(sec / 1000);
      clock = min + ':' + second;
      if (min == 0) {
        clearInterval(timer);
      }
      this.setState({
        clock: clock,
      });
    }, 1000);
  }

  render() {
    const {
      prefixCls,
      size,
      ClassName,
      style,
      onClick,
      children,
    } = this.props;
    const bg = `${prefixCls}-${size}`;
    const wrapCls = classNames(
      ClassName,
      `${styles[prefixCls]}`,
      `${styles[bg]}`,
    );
    return (
      <div className={wrapCls} style={style} onClick={onClick}>
        { this.state.clock }
      </div>
    );
  }
}
export default Time;
