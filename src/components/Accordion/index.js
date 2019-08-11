import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './accordion.less';
/**
 * @Author:BMW
 * preCss             默认属性
 * className          默认样式
 * @param title       标题
 * @param children    下拉内容
 */
export class Accordion extends Component {
    static defaultProps = {
      preCss: 'jz-accordion-item',
      default: false,
      onClick() {},
    };

    constructor(props) {
      super(props);
      this.state = {
        show: this.props.defaultShow,
      };
    }

    xl=() => {
      this.setState({
        show: !this.state.show,
      });
    }

    render() {
      const {
        preCss,
        className,
        title,
        children,
        defaultShow,
        onClick,
      } = this.props;
      const Accord = classNames(
        className,
        `${styles[preCss]}`,
      );
      return (
        <div className={Accord}>
          <div className={styles['jz-accordion-header']} role="button" tabIndex="0" aria-expanded="false" onClick={onClick}>
            <i className={[styles.arrow, defaultShow ? styles.down : null].join(' ')}></i>
            <div className={styles.tit}>{title}</div>
          </div>
          {
            defaultShow
              ? (
                <div className={styles['jz-accordion-content'] + ' ' + ['jz-accordion-content-inactive']}>
                  <div className={styles['jz-accordion-content-box']}>
                    {children}
                  </div>
                </div>
              ) : null
          }
        </div>
      );
    }
}

export default Accordion;
