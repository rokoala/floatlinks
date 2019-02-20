import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store, history } from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { fab, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { fas, faSms } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Login from './scenes/Login';
import Welcome from './scenes/Welcome';
import Agenda from './scenes/Agenda';
import TimeScheduler from './scenes/TimeScheduler';
import ConfirmScheduler from './scenes/ConfirmScheduler';
import Profile from './scenes/Profile';
import Admin from './scenes/Admin';
import NextAppoitments from './scenes/Admin/NextAppointments';
import NewCustomer from './scenes/Admin/NewCustomer';
import PrivateRoute from './components/PrivateRoute';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';

library.add(fab, faWhatsapp, fas, faSms);

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" exact={true} component={Admin} />
            <Route path="/admin/nextAppointments" component={NextAppoitments} />
            <Route path="/admin/newCustomer" component={NewCustomer} />
            <PrivateRoute path="/" component={Welcome} exact={true} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/schedule/day" component={Agenda} />
            <PrivateRoute path="/schedule/time" component={TimeScheduler} />
            <PrivateRoute
              path="/schedule/confirm"
              component={ConfirmScheduler}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
