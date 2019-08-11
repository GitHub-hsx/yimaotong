/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-13 15:02:25
 * @LastEditTime: 2019-08-09 08:59:59
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
