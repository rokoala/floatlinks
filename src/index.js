import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store, history } from './store';
import * as serviceWorker from './serviceWorker';

import Customer from './app/views/customer/';
import ServiceProvider from './app/views/serviceProvider/';
import './index.css';

const RootHtml = () => (
  <ReduxProvider store={Store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/admin" exact={true} component={ServiceProvider} />
        <Route path="/customer" exact={true} component={Customer} />
      </Switch>
    </ConnectedRouter>
  </ReduxProvider>
);

render(<RootHtml />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
