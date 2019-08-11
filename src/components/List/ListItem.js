import classnames from 'classnames';
import React, { MouseEventHandler } from 'react';
import styles from './list.less';

/**
 * list 内部组件
 * @author hao Yuanyuan
 * @param align 位置
 * @param multipleLine 是否多行
 * @param error 是否错误+
 * @param wrap
 * @param platform 平台(ios android)
 */
export default class ListItem extends React.Component {
  static defaultProps = {
    prefixCls: 'jz-list',
    align: 'middle',
    error: false,
    multipleLine: false,
    wrap: false,
    platform: 'ios',
    showStyle: 'content',
  }

  constructor(props) {
    super(props);
    this.state = {
      coverRippleStyle: { display: 'none' },
      RippleClicked: false,
    };
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  onClick = (ev) => {
    const { onClick, platform } = this.props;
    const isAndroid = platform === 'android';
    if (!!onClick && isAndroid) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
      }
      const Item = ev.currentTarget;
      const RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
      const ClientRect = ev.currentTarget.getBoundingClientRect();
      const pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
      const pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
      const coverRippleStyle = {
        width: `${RippleWidth}px`,
        height: `${RippleWidth}px`,
        left: `${pointX}px`,
        top: `${pointY}px`,
      };
      this.setState(
        {
          coverRippleStyle,
          RippleClicked: true,
        },
        () => {
          this.debounceTimeout = setTimeout(() => {
            this.setState({
              coverRippleStyle: { display: 'none' },
              RippleClicked: false,
            });
          }, 1000);
        },
      );
    }

    if (onClick) {
      onClick(ev);
    }
  }

  render() {
    const {
      prefixCls,
      className,
      activeStyle,
      error,
      align,
      wrap,
      disabled,
      children,
      multipleLine,
      thumb,
      extra,
      extras,
      arrow,
      onClick,
      showStyle,
      ...restProps
    } = this.props;
    const { platform, ...otherProps } = restProps;
    const { coverRippleStyle, RippleClicked } = this.state;

    const wrapCls = classnames(styles[`${prefixCls}-item`], className, {
      [styles[`${prefixCls}-item-disabled`]]: disabled,
      [styles[`${prefixCls}-item-error`]]: error,
      [styles[`${prefixCls}-item-top`]]: align === 'top',
      [styles[`${prefixCls}-item-middle`]]: align === 'middle',
      [styles[`${prefixCls}-item-bottom`]]: align === 'bottom',
    });

    const rippleCls = classnames(styles[`${prefixCls}-ripple`], {
      [styles[`${prefixCls}-ripple-animate`]]: RippleClicked,
    });

    const lineCls = classnames(styles[`${prefixCls}-line`], {
      [styles[`${prefixCls}-line-multiple`]]: multipleLine,
      [styles[`${prefixCls}-line-wrap`]]: wrap,
    });

    const arrowCls = classnames(styles[`${prefixCls}-arrow`], {
      [styles[`${prefixCls}-arrow-horizontal`]]: arrow === 'horizontal',
      [styles[`${prefixCls}-arrow-vertical`]]: arrow === 'down' || arrow === 'up',
      [styles[`${prefixCls}-arrow-vertical-up`]]: arrow === 'up',
    });

    const content = (
      <div
        {...otherProps}
        onClick={ev => {
          this.onClick(ev);
        }}
        className={wrapCls}
      >
        {thumb ? (
          <div className={styles[`${prefixCls}-thumb`]}>
            {typeof thumb === 'string' ? <img src={thumb} alt="" /> : thumb}
          </div>
        ) : null}
        <div className={lineCls}>
          {extra !== undefined && (
            <div className={styles[`${prefixCls}-${showStyle}`]}>{extra}</div>
          )}
          {children !== undefined && (
            <div className={styles[`${prefixCls}-${showStyle}-extra`]}>{children}</div>
          )}
          {arrow && <div className={arrowCls} aria-hidden="true" />}
          {extras !== undefined && (
            <div className={styles.extras}><span>{extras}</span></div>
          )}
        </div>
        <div style={coverRippleStyle} className={rippleCls} />
      </div>
    );
    const touchProps = {};
    Object.keys(otherProps).forEach(key => {
      if (/onTouch/i.test(key)) {
        touchProps[key] = otherProps[key];
        delete otherProps[key];
      }
    });

    return (
      <div className={styles[`${prefixCls}-item-active`]}>
        {content}
      </div>
    );
  }
}
