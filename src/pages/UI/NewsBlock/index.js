import React, { Component } from 'react';
import classNames from 'classnames';
import ApiConfig from 'constants/ApiConfig';

import {
  WingBlank,
  TitleDisplay,
  WhiteSpace,
} from 'components';
import Styles from './styles.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;

/**
 * 新闻列表组件
 * @author hao Yuanyuan
 * @param prefixCls 组件默认样式名
 * @param className 组件传入 className
 * @param leftContent 组件左侧内容
 * @param rightContent 组件右侧内容
 *
 */
class NewsBlock extends Component {
  static defaultProps = {
    prefixCls: 'newBlock',
    backgroundColor: 'red',
    onClickJumpNew() {}, // 点击事件
    blockLine: 'collect',
  };

  // 一张图片
  onePictureRender(value, pic, index) {
    const {
      prefixCls,
      blockLine,
      onClickJumpNew,
    } = this.props;
    const one = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[0] + ')',
    };
    const flexStyle = {
      flexBasis: pic[0] === '' ? '100%' : '65%',
    };
    const bStyle = `${prefixCls}-${blockLine}`;
    return (
      <div onClick={() => onClickJumpNew(value)} key={index}>
        <div className={Styles.style_one + ' ' + Styles[bStyle]}>
          <div className={Styles.messageContent} style={flexStyle}>
            <WingBlank>
              <div className={Styles.title}>
                <TitleDisplay isHtml="html">{value.title}</TitleDisplay>
              </div>
              <div className={Styles.time}>
                {
                  blockLine === 'collect' ? <span>{value.virtualClick}{value.timei}</span>
                    : (
                      <div>
                        <span>{value.virtualClick}阅读</span>
                        <span className={Styles.timeSecond}>3天前</span>
                      </div>
                    )

                }
              </div>
            </WingBlank>
          </div>
          {
            pic[0] === '' ? '' : <div className={Styles.picture} style={one} />
          }
        </div>
      </div>
    );
  }

  // 三张图片
  threePictureRender(value, pic, index) {
    const {
      prefixCls,
      blockLine,
      onClickJumpNew,
    } = this.props;
    const bStyle = `${prefixCls}-${blockLine}`;
    const one = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[0] + ')',
    };
    const two = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[1] + ')',
    };
    const three = {
      backgroundImage: 'url(' + IMG_NAME_BASE_URL + pic[2] + ')',
    };
    return (
      <div className={Styles.style_two + ' ' + Styles[bStyle]} key={index} onClick={() => onClickJumpNew(value)}>
        <WingBlank>
          <TitleDisplay isHtml="html">{value.title}</TitleDisplay>
          <div className={Styles.pictureContent}>
            <div style={one}>
              {/* <img src={IMG_NAME_BASE_URL + pic[0]} alt="" /> */}
            </div>
            <div style={two}>
              {/* <img src={IMG_NAME_BASE_URL + pic[1]} alt="" /> */}
            </div>
            <div style={three}>
              {/* <img src={IMG_NAME_BASE_URL + pic[2]} alt="" /> */}
            </div>
          </div>
          <div className={Styles.time}>
            {
              blockLine === 'collect' ? <span>{value.virtualClick}{value.timei}</span>
                : (
                  <div>
                    <span>{value.virtualClick}阅读</span>
                    <span>3天前</span>
                  </div>
                )

            }
          </div>
        </WingBlank>
      </div>
    );
  }

  // 图片选择
  renderChoosePic(value, index) {
    const {
      onClickJumpNew,
      pic,
    } = this.props;
    const picUrl = pic === 'pic_url' ? value.pic_url.split(';') : value.picUrl.split(';');
    return (
      <div key={index}>
        {
          picUrl.length > 2 ? this.threePictureRender(value, picUrl, index) : this.onePictureRender(value, picUrl, index)
        }
      </div>
    );
  }

  render() {
    const {
      prefixCls,
      data,
    } = this.props;
    return (
      <div className={Styles[prefixCls]}>
        {
          data.length > 0 ? data.map((value, index) => this.renderChoosePic(value, index)) : ''
        }
      </div>
    );
  }
}

export default NewsBlock;
