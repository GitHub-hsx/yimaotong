/**
 * reducer 按需加载
 */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import createReducer from '../reducers';


// reducer 注入到store 的方法
function getInjectors(store, key, reducer) {
  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
  store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(createReducer(store.injectedReducers));
}
/**
 * 高阶组件 在组件生命周期为componentWillMount 时才开始对reducer变化
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `withReducer(${WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'})`;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    componentWillMount() {
      getInjectors(this.context.store, key, reducer);
    }

    componentWillUnmount() {

    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
