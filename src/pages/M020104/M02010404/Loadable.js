/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 15:19:49
 * @LastEditTime: 2019-08-09 09:01:57
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
