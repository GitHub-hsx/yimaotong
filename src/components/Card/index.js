import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './card.less';
/**
 * @Author:BMW
 * preCss        默认属性
 * className     默认样式
 * @param number     卡号
 * @param type    卡类型
 * @param Households     类户
 * @param name   名字
 * @param money   金额
 * @param cardStyle      背景图片控制
 * @param showDefault    控制默认卡显示
 * @param state            控制类户显示

 */
export class Card extends Component {
    static defaultProps = {
      preCss: 'wingBlank',
      changeName() {},
    };

    constructor(props) {
      super(props);
      this.state = {
        read: true,
        name: '',
        display: 'none',
        show: '',
      };
    }

    onclick = () => {
      this.setState({
        read: false,
      });
    }

    changeName = (e) => {
      this.setState({
        name: e.target.value,
      });
      e.target.style.width = e.target.value.length * 14 + 14 + 'px';
    }

    show=() => {
      if (this.state.display === 'none') {
        this.setState({
          display: !this.state.display,
          show: 'none',
        });
      } else {
        this.setState({
          display: 'none',
          show: '',
        });
      }
    }

    bankRender(index) {
      return (
        <div className={styles.cardManage}>
          <ul>
            <li><div>账户详情</div></li>
            <li><div>无卡取现</div></li>
            <li><div>账户挂失</div></li>
            <li style={{ display: this.state.show }} onClick={() => this.show(index)}><div>更多<span></span></div></li>
            <li style={{ display: this.state.display }}><div style={{ border: this.state.show }}>解除关联</div></li>
            <li style={{ display: this.state.display }}><div>转账汇款</div></li>
            <li style={{ display: this.state.display }}><div>投资理财</div></li>
            <li style={{ display: this.state.display }}><div>设为默认卡</div></li>
            <li style={{ display: this.state.display }} onClick={this.show}><div>收起<span></span></div></li>
          </ul>
        </div>
      );
    }

    creditCard() {
      return (
        <div className={styles.cardManage}>
          <ul>
            <li><div>查询账单</div></li>
            <li><div>立即还款</div></li>
            <li><div>分期还款</div></li>
            <li><div>解除关联</div></li>
          </ul>
        </div>
      );
    }

    render() {
      const {
        preCss,
        className,
        number,
        type,
        Households,
        state,
        money,
        cardStyle,
        showDefault,
        cardPicUrl,
        name,
      } = this.props;
      const cardBox = classNames(
        className,
        `${styles[preCss]}`,
        `${styles[cardStyle]}`

      );
      const bgImage = {
        backgroundImage: 'url(' + cardPicUrl + ')',
        backgroundColor: cardPicUrl,
      };
      return (
        <div className={styles.jzCard}>
          <div className={cardBox} style={bgImage}>
            {showDefault ? (
              <div className={styles.mrk} />
            ) : null
            }
            <div className={styles.whiteSpace}>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderContent}>
                  {number}
                </div>
                <div className={styles.cardHeaderExtra}>
                  <div>{type}
                    {
                      state.length > 0
                        ? <span>({ state })</span>
                        : null
                    }
                  </div>
                  <span className={styles.Households}>
                    {Households}
                  </span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardFooterContent}>
                  <div onClick={this.onclick}>
                  别名：
                    {/* <div>{name}</div> */}
                    <input className={styles.name} type="text" maxLength="5" value={this.state.name} onChange={this.changeName} />
                    <div className={styles.modify}></div>
                  </div>
                </div>
                <div className={styles.cardFooterExtra}>
                可用余额：￥{money}
                </div>
              </div>
            </div>
            <div className={styles.whiteSpace}>
            </div>
          </div>
          {
            type === '信用卡' ? this.creditCard() : this.bankRender()
          }
        </div>
      );
    }
}

export default Card;
