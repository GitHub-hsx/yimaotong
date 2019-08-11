import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

export class CardEvent extends Component {
  static defaultProps = {
    jumpTo() {},
    relevance() {},
  };

  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      show: '',
    };
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

  bankRender() {
    const {
      jumpTo,
      isDefault,
    } = this.props;
    return (
      <div className={styles.cardManage}>
        <ul>
          <li><div onClick={() => jumpTo()}>账户详情</div></li>
          {
            (this.props.accountType === 'VT004' || this.props.accountType === 'VT006') && this.props.accountStatus === 'VS01' && this.props.acNoType !== 'OTT05'
              ? (
                <li><div onClick={this.props.onClickNoCashCard}>无卡取现</div></li>
              )
              : (
                <li><div className={styles.noJump} onClick={this.props.onClickNoCashCard}>无卡取现</div></li>
              )
          }
          <li><div onClick={this.props.onClickLoss}>账户挂失</div></li>
          <li style={{ display: this.state.show }} onClick={() => this.show()}><div>更多<span></span></div></li>
          <li style={{ display: this.state.display }}><div style={{ border: this.state.show }} onClick={this.props.relevance}>解除关联</div></li>
          <li style={{ display: this.state.display }} onClick={this.props.onClickJumpTransfer}><div>转账汇款</div></li>
          <li style={{ display: this.state.display }} onClick={this.props.onClickJumpToWealth}><div>投资理财</div></li>
          {isDefault === '0' ? (<li style={{ display: this.state.display }} onClick={this.props.onClickSetDefault}><div>设为默认卡</div></li>) : null}
          <li style={{ display: this.state.display }} onClick={this.show}><div>收起<span></span></div></li>
        </ul>
      </div>
    );
  }

  creditCard() {
    return (
      <div className={styles.cardManage}>
        <ul>
          <li><div onClick={this.props.onClickJumpToMyBills}>查询账单</div></li>
          <li><div onClick={this.props.onClickJumpToCreditCardPayments}>立即还款</div></li>
          <li><div onClick={this.props.onClickJumpToCreditCardInstalment}>分期还款</div></li>
          <li><div onClick={this.props.relevance}>解除关联</div></li>
        </ul>
      </div>
    );
  }

  render() {
    const {
      index,
    } = this.props;
    return (
      <div>
        {this.props.accountType === 'VT005' ? this.creditCard(index) : this.bankRender(index)}
      </div>
    );
  }
}
export default CardEvent;
