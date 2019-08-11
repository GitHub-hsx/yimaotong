/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-20 16:54:09
 * @LastEditTime: 2019-08-10 13:54:21
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';
/**
 * 弹窗组件
 * @Author 宋晓波
 * @param preCss            默认属性
 * @param dialogBox         底层阴影部分
 * @param close             关闭按钮默认不显示
 * @param children          内容部分
 */
export class Verification extends Component {
  static defaultProps = {
    preCss: 'jz-modal-mask',
    dialogBox: 'jz-modal-wrap',
    close: false,
    content: 'content',
    headShow: false,
    cancelShow: false,
  };

  cancel = (event) => {
    const { click } = this.props;
    click();
    event.stopPropagation();
  }

  render() {
    const {
      preCss,
      className,
      cancel,
      close,
      children,
      que,
      dialogBox,
      title,
      headShow,
      cancelShow,
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
        <div className={mask} onClick={(e) => this.cancel(e)} />
        <div className={whiteBox} onClick={(e) => this.cancel(e)} role="dialog">
          <div role="document" className={styles['jz-modal'] + ' ' + styles['jz-modal-transparent']}>
            <div className={styles['jz-modal-content']}>
              {headShow ? (
                <div className={styles['jz-modal-header']}>
                  <div className={styles['jz-modal-title']}>
                    {title}
                    { close ? <span className={styles['jz-modal-title-close']} onClick={this.props.clickes}>X</span> : null }
                  </div>
                </div>
              ) : null}
              <div className={styles['jz-modal-body']}>
                <div className={styles['jz-modal-alert-content']}>
                  {children}
                </div>
              </div>
              <div className={styles['jz-modal-footer']}>
                <div className={styles['jz-modal-button-group-h'] + ' ' + styles['jz-modal-button-group-normal']} role="group">
                  {cancelShow ? (<div className={styles['jz-modal-button']} onClick={this.props.click}>{cancel}</div>) : null}
                  <div className={styles.zline}></div>
                  <div className={styles['jz-modal-button-one']} onClick={this.props.clicks}>{que}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Verification;
