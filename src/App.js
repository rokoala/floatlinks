import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './scenes/Login';
import Welcome from './scenes/Welcome';
import DateScheduler from './scenes/DateScheduler';
import TimeScheduler from './scenes/TimeScheduler';
import ConfirmScheduler from './scenes/ConfirmScheduler';
import Profile from './scenes/Profile';
import Admin from './scenes/Admin';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <PrivateRoute path="/" component={Welcome} exact={true} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/schedule/day" component={DateScheduler} />
            <PrivateRoute path="/schedule/time" component={TimeScheduler} />
            <PrivateRoute
              path="/schedule/confirm"
              component={ConfirmScheduler}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
