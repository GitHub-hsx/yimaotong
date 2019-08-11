import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

// store 注入 saga方法
const injectSaga = (store, key, descriptor = {}, args) => {
  const newDescriptor = {
    ...descriptor,
    mode: descriptor.mode || RESTART_ON_REMOUNT,
  };
  const { saga, mode } = newDescriptor;
  // 判断store 是否含有对应key的 saga
  let hasSaga = Reflect.has(store.injectedSagas, key);

  // 开发环境 saga 热更新
  if (process.env.NODE_ENV !== 'production') {
    const oldDescriptor = store.injectedSagas[key];
    // enable hot reloading of daemon and once-till-unmount sagas
    if (hasSaga && oldDescriptor.saga !== saga) {
      oldDescriptor.task.cancel();
      hasSaga = false;
    }
  }
  // 注入 inject
  if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
    /* eslint-disable no-param-reassign */
    store.injectedSagas[key] = {
      ...newDescriptor,
      task: store.runSaga(saga, args),
    };
    /* eslint-enable no-param-reassign */
  }
};
// Store 中注销saga
const ejectSaga = (store, key) => {
  if (Reflect.has(store.injectedSagas, key)) {
    const descriptor = store.injectedSagas[key];
    if (descriptor.mode && descriptor.mode !== DAEMON) {
      descriptor.task.cancel();
      // Clean up in production; in development we need `descriptor.saga` for hot reloading
      if (process.env.NODE_ENV === 'production') {
        // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
        store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
      }
    }
  }
};
/**
 * 高阶组件 用于按需注入注销 saga
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default ({ key, saga, mode }) => WrappedComponent => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `withSaga(${WrappedComponent.displayName
      || WrappedComponent.name || 'Component'})`;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };


    componentWillMount() {
      // // 注入全局saga
      // injectSaga(this.context.store, 'global', { globalSaga, mode }, this.props);
      // 组件 注入saga
      injectSaga(this.context.store, key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      // 组件注销时 清除saga
      ejectSaga(this.context.store, key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
