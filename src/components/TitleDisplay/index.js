
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style.less';

/**
 * @author 郝媛媛
 * @param size {} 标题展示
 * @param prefixCls 默认class名称
 */
class TitleDisplay extends Component {
  static defaultProps={
    prefixCls: 'yzx-titleDisplay',
    size: 'md',
    bar: 'parent',
    isHtml: 'normal',
    disType: 'collect',
  }

  render() {
    const {
      prefixCls,
      bar,
      ClassName,
      style,
      children,
      isHtml,
      disType,
    } = this.props;
    const bg = `${prefixCls}-${bar}`;
    const fontSty = `${prefixCls}-${disType}`;
    const wrapCls = classNames(
      ClassName,
      `${styles[prefixCls]}`,
    );
    const navbar = classNames(
      `${styles[bg]}`,
      styles[`${prefixCls}-basicStyle`],
      `${styles[fontSty]}`,
    );
    return (
      <div className={wrapCls} style={style}>
        {
          disType === 'collect' ? <div className={navbar} /> : ''
        }
        {
          isHtml === 'html' ? <span dangerouslySetInnerHTML={{__html: children }} /> : children
        }
      </div>
    );
  }
}
export default TitleDisplay;
