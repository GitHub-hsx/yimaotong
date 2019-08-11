/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 09:53:53
 * @LastEditTime: 2019-08-11 21:41:35
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from './style.less';
import {
  star,
  starFull,
} from '../../assets/picture';

/**
 * input组件*
 *  @Author:                 郝媛媛
 * @param preCss             默认属性
 * @param Input              组件名称
 * @param placeholder        placeholder内容
 * @param value              input值
 * @param readOnly           不可读
 * @param ...restProps       传值
 * @param stylesPlaceholder   Placeholder位置
 */


class Grade extends Component {
    static defaultProps = {
      preCss: 'grade',
      readOnly: false,
      num: 5,
      selectId: 0,
      changeItem() {},
      status: true,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectId: props.selectId,
      };
    }


    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.selectId !== this.state.selectId) {
    //     this.setState({
    //       selectId: nextProps.selectId,
    //     });
    //   }
    // }

    changeItem = (index) => {
      if (this.props.status) {
        const { onChange } = this.props;
        if (onChange) {
          onChange(index + 1);
        }
        this.setState({
          selectId: index + 1,
        });
      }
    }

    starList(index, select) {
      const bgImage = {
        backgroundImage: select ? 'url(' + starFull + ')' : 'url(' + star + ')',
      };
      return (
        <div className={Styles.star} key={index} style={bgImage} onClick={() => this.changeItem(index)} />
      );
    }

    render() {
      const {
        preCss,
        className,
        name,
        num,
        ...restProps
      } = this.props;
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push(i);
      }
      return (
        <div className={Styles.grade}>
          <span>{name}</span>
          {
            arr.map((value, index) => this.starList(index, index < this.state.selectId))
          }
        </div>
      );
    }
}

export default Grade;
