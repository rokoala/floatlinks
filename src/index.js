import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store, history } from './app/state/store';
import * as serviceWorker from './serviceWorker';

import routes from './app/routes';
import './index.css';

const AppRoute = ({
  component: Component,
  layout: Layout,
  routePrivate = true,
  noLayout = false,
  authentication,
  ...rest
}) =>
  routePrivate ? (
    <Route
      {...rest}
      render={props =>
        authentication ? (
          noLayout ? (
            <Component {...props} />
          ) : (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  ) : (
    <Route
      {...rest}
      render={props =>
        noLayout ? (
          <Component {...props} />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );

const AppRouteComponent = connect(store => ({
  authentication: store.login.authentication
}))(AppRoute);

const RootHtml = () => (
  <ReduxProvider store={Store}>
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map(route => (
          <AppRouteComponent key={route.path} {...route} />
        ))}
      </Switch>
    </ConnectedRouter>
  </ReduxProvider>
);

render(<RootHtml />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
