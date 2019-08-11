import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './navbar.less';

/**
 * 导航栏组件
 * @author hao Yuanyuan
 * @param preCss 组件默认样式名
 * @param className 组件传入 className
 * @param leftContent 组件左侧内容
 * @param rightContent 组件右侧内容
 *
 */
class Navbar extends Component {
  static defaultProps = {
    preCss: 'jz-navbar',
    backgroundColor: 'red',
  };

  render() {
    const {
      preCss,
      className,
      children,
      leftContent,
      rightContent,
      backgroundColor,
    } = this.props;
    const bg = `${preCss}-${backgroundColor}`;
    const classes = classNames(
      className,
      `${styles[preCss]}`,
      `${styles[bg]}`
    );
    return (
      <div className={classNames(classes)}>
        <div className={styles[`${preCss}-left`]}>
          {leftContent}
        </div>
        <div className={styles[`${preCss}-title`]}>
          {children}
        </div>
        <div className={styles[`${preCss}-right`]}>
          {rightContent}
        </div>
      </div>
    );
  }
}

export default Navbar;
