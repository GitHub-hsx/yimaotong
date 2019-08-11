import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './wingBlank.less';

/**
 * 左右留白组件
 * @author 郝媛媛
 * @param prefixCls: class名
 * @param size:左右留白的大小
 */
class WingBlank extends Component {
  static defaultProps={
    prefixCls: 'wingBlack',
    size: 'md',
  }

  render() {
    const {
      prefixCls,
      ClassName,
      size,
      onClick,
      style,
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
        {children}
      </div>
    );
  }
}
export default WingBlank;
