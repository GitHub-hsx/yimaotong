import React, { Component } from 'react';
import classNames from 'classnames';

import imgYesUrl from 'assets/images/yes.png';
import imgNoUrl from 'assets/images/no.png';
import styles from './success.less';

/**
 * @author: yuzuru
 * flag 成功/失败页面
 */
class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: this.props.flag,
    };
  }

  render() {
    const {
      flag,
      children,
      childMessage,
      className,
      style,
    } = this.props;

    const cssStyles = classNames({
      className,
      [styles.success]: true,
    });
    return (
      <div className={cssStyles} style={style}>
        <div className={styles.content}>
          {
            flag
              ? <img src={imgYesUrl} alt="404" />
              : <img src={imgNoUrl} alt="404" />
          }
          {/* <img src={imgUrl} alt="404" /><br /> */}
          <br /><span className={styles.children}>{children}</span><br />
          <span className={styles.childMessage}>{childMessage}</span>
        </div>
      </div>
    );
  }
}

export default Success;
