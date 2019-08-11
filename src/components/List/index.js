import React from 'react';
import classnames from 'classnames';
import styles from './list.less';

/**
 * 列表组件
 * @author hao Yuanyuan
 * @param prefixCls 默认组件名
 * @function renderHeader 头部或者渲染头部的方法
 * @function renderFooter 尾部或者渲染尾部的方法
 */
export default class List extends React.Component {
  static defaultProps = {
    prefixCls: 'jz-list',
  };

  render() {
    const {
      prefixCls,
      children,
      className,
      style,
      renderHeader,
      renderFooter,
      ...restProps
    } = this.props;
    const wrapCls = classnames(styles[prefixCls], className);
    return (
      <div className={wrapCls} style={style} {...restProps}>
        {renderHeader ? (
          <div className={styles[`${prefixCls}-header`]}>
            {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
          </div>
        ) : null}
        {children ? (
          <div className={styles[`${prefixCls}-body`]}>{children}</div>
        ) : null}
        {renderFooter ? (
          <div className={styles[`${prefixCls}-footer`]}>
            {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
          </div>
        ) : null}
      </div>
    );
  }
}
