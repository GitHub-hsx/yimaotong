/**
 *
 * App
 * 最外围的路由组件 全局组件 所有路由包含在内
 */

import React from 'react';
import { Switch } from 'react-router-dom';
import nprogress from 'nprogress';
import CommunicateContainer from 'containers/CommunicateContainer';
import {
  routes,
  RouteWithSubRoutes,
} from './routes/routes';
import 'nprogress/nprogress.css';


class GlobalRouter extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    return (
      <div className="global-root">
        <CommunicateContainer>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </Switch>
        </CommunicateContainer>
      </div>
    );
  }
}
export default GlobalRouter;
