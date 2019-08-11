/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 19:07:20
 * @LastEditTime: 2019-08-09 09:02:14
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
