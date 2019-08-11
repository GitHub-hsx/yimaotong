import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './popup.less';
/**
 * 弹窗组件
 * @Author 宋晓波
 * @param preCss            默认属性
 * @param dialogBox         底层阴影部分
 * @param close             关闭按钮默认不显示
 * @param title1            header部分
 * @param children          内容部分
 * @param title3和title4    按钮
 */
export class Popup extends Component {
    static defaultProps = {
      preCss: 'jz-modal-mask',
      dialogBox: 'jz-modal-wrap',
      close: false,
      content: 'content',
      ButtonShow: false,
    };

    render() {
      const {
        preCss,
        className,
        close,
        title1,
        children,
        title3,
        title4,
        ButtonShow,
        dialogBox,
      } = this.props;
      const content = classNames(
        className,
        `${styles[preCss]}`,
      );
      const mask = classNames(
        className,
        `${styles[preCss]}`,
      );
      const whiteBox = classNames(
        className,
        `${styles[dialogBox]}`,
      );
      return (
        <div className={content}>
          <div className={mask} />
          <div className={whiteBox} role="dialog">
            <div role="document" className={styles['jz-modal'] + ' ' + styles['jz-modal-transparent']}>
              <div className={styles['jz-modal-content']}>
                <div className={styles['jz-modal-header']}>
                  <div className={styles['jz-modal-title']}>
                    {title1}
                    { close ? <span className={styles['jz-modal-title-close']} onClick={this.props.click}>X</span> : null }
                  </div>
                </div>
                <div className={styles['jz-modal-body']}>
                  <div className={styles['jz-modal-alert-content']}>
                    {children}
                  </div>
                </div>
                <div className={styles['jz-modal-footer']}>
                  { ButtonShow ? (
                    <div className={styles['jz-modal-button-group-h'] + ' ' + styles['jz-modal-button-group-normal']} role="group">
                      <div className={styles['jz-modal-button-one']}>{title3}</div>
                      <div className={styles['jz-modal-button']}>{title4}</div>
                    </div>
                  ) : null }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Popup;
