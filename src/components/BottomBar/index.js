/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-02 19:27:27
 * @LastEditTime: 2019-08-10 09:45:31
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import {
  icbc, // 中国工商银行
  abc, // 中国农业银行
  boc, // 中国银行
  ccb, // 中国建设银行
  bcm, // 交通银行
} from '../../assets/picture.js';
class BottomBar extends Component {
  static defaultProps = {
    prefixCls: 'yzx-navbar',
    onChange() {},
    selectedIndex: 0,
    describe: ['返回', '首页', '圈子', '发布', '我的'],
    picture: [icbc, abc, boc, ccb, bcm],
    selectPic: [icbc, abc, boc, ccb, bcm],
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


  listRender(value, index, selected) {
    const {
      prefixCls,
      className,
      children,
      picture = [],
      describe = [],
      selectPic = [],
      ...restProps
    } = this.props;
    const bgImage = {
      backgroundImage: selected ?  'url(' + selectPic[index] + ')' : 'url(' + picture[index] + ')' ,
      // backgroundColor: 'red',
    };
    const styleCls = {
      color: selected ? '#333333' : '#666',
      fontWeight: selected ? 'bold' : 'normal',
    };
    return (
      <div className={styles[`${prefixCls}-content`]} key={index} onClick={(e) => this.changeItem(e, index)}>
        <div className={styles[`${prefixCls}-list`]} style={bgImage}></div>
        <div className={styles[`${prefixCls}-items`]} style={styleCls}>{value}</div>
      </div>
    );
  }

  render() {
    const {
      prefixCls,
      className,
      children,
      picture = [],
      describe = [],
      ...restProps
    } = this.props;
    return (
      <div className={classnames(className, `${styles[prefixCls]}`)}>
        {
          describe.map((value, index) => this.listRender(value, index, index === this.state.selectedIndex))
        }
      </div>
    );
  }
}
export default BottomBar;
