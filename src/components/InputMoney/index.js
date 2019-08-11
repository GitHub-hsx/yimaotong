import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './inputMoney.less';

/**
 * input组件*
 *  @Author:                 cgy
 * @param preCss             默认属性
 * @param Input              组件名称
 * @param placeholder        placeholder内容
 * @param value              input值
 * @param readOnly           不可读
 * @param ...restProps       传值
 * @param stylesPlaceholder   Placeholder位置
 */

export class InputMoney extends Component {
    static defaultProps = {
      preCss: 'input',
      readOnly: false,
      stylesPlaceholder: 'input-placeholder',
      textShow: false,
    };

    render() {
      const {
        preCss,
        className,
        placeholder,
        value,
        stylesPlaceholder,
        textShow,
        text,
        ...restProps
      } = this.props;
      const bd = classNames(
        className,
        `${styles[preCss]}`,
        `${styles[stylesPlaceholder]}`,
      );
      return (
        <div>
          {value.length < 11
            ? (
              <div className={styles.sss}>
                <span className={styles.as}>￥</span>
                <input placeholder={placeholder} value={value} maxLength="14" readOnly className={bd} {...restProps} />
                {textShow ? (<span className={styles.text} onClick={this.props.click}>{text}</span>) : null}
              </div>
              // <div className={styles.ssslong}>
              //   <span className={styles.as}>￥</span>
              //   <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long} {...restProps} />
              // </div>
            ) : (value.length === 11
              ? (
                <div className={styles.sss}>
                  <span className={styles.as}>￥</span>
                  <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long10} {...restProps} />
                  {textShow ? (<span className={styles.text} onClick={this.props.click}>{text}</span>) : null}
                </div>
              ) : (
                value.length === 12
                  ? (
                    <div className={styles.sss}>
                      <span className={styles.as}>￥</span>
                      <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long11} {...restProps} />
                      {textShow ? (<span className={styles.text} onClick={this.props.click}>{text}</span>) : null}
                    </div>
                  ) : (
                    value.length === 13
                      ? (
                        <div className={styles.sss}>
                          <span className={styles.as}>￥</span>
                          <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long12} {...restProps} />
                          {textShow ? (<span className={styles.text} onClick={this.props.click}>{text}</span>) : null}
                        </div>
                      ) : (
                        value.length === 14
                          ? (
                            <div className={styles.sss}>
                              <span className={styles.as}>￥</span>
                              <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long12} {...restProps} />
                              {textShow ? (<span className={styles.text} onClick={this.props.click}>{text}</span>) : null}
                            </div>
                          ) : (
                            <div className={styles.sss}>
                              <span className={styles.as}>￥</span>
                              <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long13} {...restProps} />
                              {textShow ? (<span className={styles.text} onClick={this.props.click}>{text}</span>) : null}
                            </div>
                          )
                      )
                  )
              ))
          }

          {/* {value.length === 10
            ? (
              <div className={styles.sss}>
                <span className={styles.as}>￥</span>
                <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long10} {...restProps} />
              </div>
            ) : null
          }
          {value.length === 11
            ? (
              <div className={styles.sss}>
                <span className={styles.as}>￥</span>
                <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long11} {...restProps} />
              </div>
            ) : null
          }
          {value.length === 12
            ? (
              <div className={styles.sss}>
                <span className={styles.as}>￥</span>
                <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long12} {...restProps} />
              </div>
            ) : null
          }
          {value.length === 13
            ? (
              <div className={styles.sss}>
                <span className={styles.as}>￥</span>
                <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long13} {...restProps} />
              </div>
            ) : null
          }
          {value.length === 14
            ? (
              <div className={styles.sss}>
                <span className={styles.as}>￥</span>
                <input placeholder={placeholder} value={value} maxLength="14" readOnly className={styles.long14} {...restProps} />
              </div>
            ) : null
          } */}
        </div>
      );
    }
}

export default InputMoney;
