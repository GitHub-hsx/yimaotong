
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './whiteSpace.less';

/**
 * @author 郝媛媛
 * @param size {} 白条高度
 * @param prefixCls 默认class名称
 */
class WhiteSpace extends Component {
  static defaultProps={
    prefixCls: 'jz-whitespace',
    size: 'md',
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
        { children }
      </div>
    );
  }
}
export default WhiteSpace;
