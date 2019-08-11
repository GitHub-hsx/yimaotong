/**
 * 高阶组件 组件加载进度条
 */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import nprogress from 'nprogress';

/**
 * 高阶组件 在组件生命周期为componentWillMount
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default () => WrappedComponent => {
  class NprogressHOC extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `withReducer(${WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'})`;

    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    componentWillMount() {
      nprogress.start();
    }

    componentDidMount() {
      nprogress.done();
    }

    componentDidUpdate() {
      nprogress.done();
    }

    componentWillUnmount() {

    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(NprogressHOC, WrappedComponent);
};
