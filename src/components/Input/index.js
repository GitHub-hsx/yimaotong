import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './input.less';

/**
 * input组件*
 *  @Author:                 宋晓波
 * @param preCss             默认属性
 * @param Input              组件名称
 * @param placeholder        placeholder内容
 * @param value              input值
 * @param readOnly           不可读
 * @param ...restProps       传值
 * @param stylesPlaceholder   Placeholder位置
 */

export class Input extends Component {
    static defaultProps = {
      preCss: 'input',
      readOnly: false,
      stylesPlaceholder: 'input-placeholder',
    };

    render() {
      const {
        preCss,
        className,
        placeholder,
        value,
        stylesPlaceholder,
        ...restProps
      } = this.props;
      const bd = classNames(
        className,
        `${styles[preCss]}`,
        `${styles[stylesPlaceholder]}`,
      );
      return (
        <input placeholder={placeholder} value={value} readOnly className={bd} {...restProps} />
      );
    }
}

export default Input;
