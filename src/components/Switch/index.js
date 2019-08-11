import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './swith.less';
/**
 * seitch              开关组件
 * @Author:            宋晓波
 * @param preCss       默认属性
 * @param onChange={this.props.onChange} checked={this.props.checked} 监听checked。
 * @param styleSwitchBg 样式改变
 */
export class Switch extends Component {
  static defaultProps = {
    preCss: 'am-list-extra',
    styleSwitchBg: 'am-switch-red-input',
    Check() { },
  };


  Check = () => {
    this.props.Check();
  }


  render() {
    const {
      preCss,
      className,
      styleSwitchBg,
      checked,
    } = this.props;
    const checkbox = classNames(
      className,
      `${styles[preCss]}`,
    );
    const switchBg = classNames(
      `${styles['am-switch']}`,
      `${styles[styleSwitchBg]}`,
    );
    return (
      <div onClick={() => this.props.onClick && this.props.onClick(!checked)} className={checkbox}>
        <label className={switchBg} htmlFor="true">
          <input type="checkbox" name="check1" className={styles['am-switch-checkbox']} checked={checked} onClick={this.props.Check} value="checkbox" />
          <div className={styles.checkbox}>
          </div>
        </label>
      </div>
    );
  }
}

export default Switch;
