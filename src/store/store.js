/**
 * redux store
 * @version 1.0
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { fromJS, Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import createReducer from '../reducers';
import globalSaga from '../globalSaga';

const sagaMiddleware = createSagaMiddleware();


export default function configureStore(initialState = {}, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  // 开发环境使用redux-logger控制台打印 store信息
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger(
      {
        stateTransformer: state => {
          if (Iterable.isIterable(state)) return state.toJS();
          return state;
        },
      }
    ));
  }

  const enhancers = [applyMiddleware(...middlewares)];
  // 如果在开发环境客户端安装了 Redux DevTools 那么就可以使用
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers = process.env.NODE_ENV !== 'production'
   && typeof window === 'object'
   && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO: Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // store扩展
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // 注入全局saga
  store.injectedSagas.global = {
    saga: globalSaga,
    task: store.runSaga(globalSaga),
  };

  // reducers 热更新
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  return store;
}


// reducers 按需加载方法
export function injectAsyncReducer(store, key, asyncReducer) {
  // 如果存在key 和 异步方法则返回 ES6 Reflect
  if (Reflect.has(store.asyncReducers, key)) return;
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
