/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 21:35:32
 * @LastEditTime: 2019-08-06 21:35:32
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
