import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './anchoredAlphabet.less';
/**
 * @Author:                  BMW
 * @param preCss             默认属性
 * @param AnchoredAlphabet   组件名称
 */
export class AnchoredAlphabet extends Component {
    static defaultProps = {
      preCss: 'content',
    };

    scrollToAnchor(id) {
      document.getElementById(id).scrollIntoView();
    }


    render() {
      const {
        preCss,
        className,
        list,
      } = this.props;
      const content = classNames(
        className,
        `${styles[preCss]}`,
      );
      return (
        <div className={content}>
          <div className={styles.letter}>
            <ul>
              {
                list.length === 22 ? list.map((value, index) => (<li><a onClick={() => this.scrollToAnchor('A1')} key={index}>{value}</a></li>)) : null
              }    
            </ul>
          </div>
          <div className={styles.container}>
            <div className={styles.city}>
              <div className={styles['city-list']}><span className={styles['city-letter']} id={"A1"}>A</span>
                <div className={styles.outerStyles}>
                  <div className={styles.listContain}>
                    <div className={styles.name}>安徽省农村信用社</div>
                    <div className={styles.line} />
                  </div>
                  <div className={styles.listContain}>
                    <div className={styles.name}>安徽省农村信用社</div>
                    <div className={styles.line} />
                  </div>
                </div>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="B1">B</span>
                <div className={styles.outerStyles}>
                  <p data-id="150200">我是b</p>
                  <p data-id="150200">我是b</p>
                </div>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="C1">C</span>
                <div className={styles.outerStyles}>
                  <p data-id="140400">我是c</p>
                  <p data-id="140400">我是c</p>
                  <p data-id="140400">我是c</p>
                  <p data-id="140400">我是c</p>
                  <p data-id="140400">我是c</p>
                  <p data-id="140400">我是c</p>
                </div>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="D1">D</span>
                <p data-id="140400">我是d</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="E1">E</span>
                <p data-id="140400">我是e</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="F1">F</span>
                <p data-id="140400">我是f</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="G1">G</span>
                <p data-id="140400">我是g</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="H1">H</span>
                <p data-id="140400">我是h</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="J1">J</span>
                <p data-id="140400">我是j</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="K1">K</span>
                <p data-id="140400">我是k</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="L1">L</span>
                <p data-id="140400">我是l</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="M1">M</span>
                <p data-id="140400">我是m</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="N1">N</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="P1">P</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="Q1">Q</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="R1">R</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="S1">S</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="T1">T</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="W1">W</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="X1">X</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="Y1">Y</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
              <div className={styles['city-list']}><span className={styles['city-letter']} id="Z1">Z</span>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
                <p data-id="140400">我是c</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default AnchoredAlphabet;
