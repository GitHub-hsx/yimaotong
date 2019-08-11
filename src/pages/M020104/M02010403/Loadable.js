/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 20:32:58
 * @LastEditTime: 2019-08-09 09:01:45
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
