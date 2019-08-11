import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './tabs.less';

/**
 * @author 郝媛媛
 * @param prefixCls:class名
 * @param selectIndex:
 * @param value:tab名
 */
class Tabs extends Component {
  static defaultProps = {
    prefixCls: 'jz-tabs',
    selectedIndex: 0,
    disabled: false,
    values: [],
    onChange() {},
    onValueChange() {},
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  changeItem=(e, index) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e, index);
    }
    this.setState({
      selectedIndex: index,
    });
  }

  renderSegmentItem(idx, value, selected) {
    const { prefixCls } = this.props;
    const select = `${prefixCls}-item-selected`;
    const itemCls = classnames(`${styles[`${prefixCls}-item`]}`, { [`${styles[select]}`]: selected });
    const styleCls = {
      color: selected ? '#333333' : '#666',
      fontWeight: selected ? 'bold' : 'normal',
    };
    return (
      <div key={idx} className={styles[`${prefixCls}-item-container`]}>
        <div className={itemCls} style={styleCls} onClick={(e) => this.changeItem(e, idx)}>
          <div className={styles[`${prefixCls}-item-inner`]} />
          {value}
          <div className={styles.bar} />
        </div>
      </div>
    );
  }

  render() {
    const {
      className,
      prefixCls,
      style,
      disabled,
      values = [],
    } = this.props;

    const wrapCls = classnames(className,
      `${styles[prefixCls]}`,
      {
        [styles[`${prefixCls}-disabled`]]: disabled,
      });
    return (
      <div className={wrapCls} style={style} role="tablist">
        {values.map((value, idx) => this.renderSegmentItem(idx, value, idx === this.state.selectedIndex))}
      </div>
    );
  }
}
export default Tabs;
