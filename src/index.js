import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store, history } from './app/state/store';
import * as serviceWorker from './serviceWorker';

import routes from './app/routes';
import './index.css';

const AppRoute = ({
  component: Component,
  layout: Layout,
  noLayout = false,
  ...rest
}) => (
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

const RootHtml = () => (
  <ReduxProvider store={Store}>
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map(route => (
          <AppRoute key={route.path} {...route} />
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
