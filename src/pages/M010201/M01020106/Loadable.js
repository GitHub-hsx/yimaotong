/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-06 11:37:14
 * @LastEditTime: 2019-07-06 11:37:14
 * @LastEditors: your name
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
