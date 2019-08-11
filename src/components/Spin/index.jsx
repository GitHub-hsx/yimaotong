import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';
/**
 * 加载组件
 * @Author 郝媛媛
 * @param preCss            默认属性
 *
 */
export class Spin extends Component {
  static defaultProps = {
    preCss: 'spin',
  };

  render() {
    const {
      preCss,
      className,
    } = this.props;
    const content = classNames(
      className,
      `${styles[preCss]}`,
    );
    const mask = classNames(
      className,
      `${styles[preCss]}`,
    );
    return (
      <div className={content}>
        <div className={mask} />
        <div className={styles.load}></div>
      </div>
    );
  }
}

export default Spin;
