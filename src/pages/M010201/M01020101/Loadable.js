/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 20:27:57
 * @LastEditTime: 2019-08-09 08:58:05
 * @LastEditors: Please set LastEditors
 */
/**
 * 异步加载 组件
 *
 */
import Loadable from 'react-loadable';

import Loading from 'components/Loading';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
