import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './button.less';

/**
 * @author: yuzuru
 * prefixCls Ĭ��class����
 * bgColor {} ��ť��ɫ
 */
class Button extends Component {
  static defaultProps = {
    prefixCls: 'buttonStyles',
    bgColor: 'red',
  }

  render() {
    const {
      prefixCls,
      children,
      onClick,
      bgColor,
      ...buttonType
    } = this.props;
    const bg = `${prefixCls}-${bgColor}`;
    const wrapCls = classNames(
      `${styles[prefixCls]}`,
      `${styles[bg]}`,
    );
    return (
      <div>
        <button
          type="button"
          className={wrapCls}
          onClick={onClick}
          {...buttonType}
        >
          {children}
        </button>
      </div>
    );
  }
}

export default Button;
