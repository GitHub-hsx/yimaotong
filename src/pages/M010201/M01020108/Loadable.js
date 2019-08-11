/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 23:36:09
 * @LastEditTime: 2019-08-05 23:36:09
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
