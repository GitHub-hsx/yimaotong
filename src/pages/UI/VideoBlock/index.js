import React, { Component } from 'react';
import classNames from 'classnames';
import ApiConfig from 'constants/ApiConfig';
import Styles from './styles.less';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;

/**
 * 视频显示组件
 * @author hao Yuanyuan
 * @param prefixCls 组件默认样式名
 * @param className 组件传入 className
 * @param leftContent 组件左侧内容
 * @param rightContent 组件右侧内容
 *
 */
class VideoBlock extends Component {
  static defaultProps = {
    prefixCls: 'videoBlock',
    backgroundColor: 'red',
    onClickJumpNew() {}, // 点击事件
    blockLine: 'three', // three一排3个，two一排两个
  };

  render() {
    const {
      prefixCls,
      data,
      blockLine,
      className,
      onClickJumpNew,
    } = this.props;
    const bg = `${prefixCls}-${blockLine}`;
    const wrapCls = classNames(
      `${Styles[bg]}`,
      `${Styles[prefixCls]}`,
      className,
    );
    const bgUrl = {
      backgroundImage: 'url(' + data.memo + data.thumbPic + ')',
    };
    const bgUrlTwo = {
      backgroundImage: blockLine === 'two' ? 'url(' + IMG_NAME_BASE_URL + '/' + data.picPath + ')' : '',
    };
    const bgStyle = `thumbPic-${blockLine}`;
    const thumbPic = classNames(
      `${Styles[bgStyle]}`,
      `${Styles.thumbPic}`,
    );
    return (
      <div className={wrapCls} onClick={onClickJumpNew}>
        <div className={thumbPic} style={bgUrl} />
        {
          blockLine === 'three' ? (
            <div className={Styles.heartBlock}>
              <div className={Styles.heart} />
              <span className={Styles.thumbUps}>{data.thumbUps}</span>
            </div>
          ) : ( // 一行显示2个视频
            <div className={Styles.videoMessage}>
              <div className={Styles.title} dangerouslySetInnerHTML={{__html: data.title }} />
              <div className={Styles.bottomDis}>
                <div className={Styles.photo}>
                  <div className={Styles.pic} style={bgUrlTwo} />
                </div>
                <div className={Styles.heartRight}>
                  <div className={Styles.heart} />
                  <span className={Styles.thumbUps}>{data.thumbUps}</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default VideoBlock;
