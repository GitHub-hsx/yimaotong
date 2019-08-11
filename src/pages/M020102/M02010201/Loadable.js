/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-13 15:31:43
 * @LastEditTime: 2019-08-09 09:00:24
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
