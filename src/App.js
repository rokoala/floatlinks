import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './scenes/Login';
import Welcome from './scenes/Welcome';
import DateScheduler from './scenes/DateScheduler';
import TimeScheduler from './scenes/TimeScheduler';
import ConfirmScheduler from './scenes/ConfirmScheduler';
import Api from './resources/Api';
import './App.css';

const PrivateRoute = ({ component: Component, state, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return Api.isAuthenticated ? (
          <Component {...props} {...state} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professional: {
        name: 'Consultório Dra. Yasmin'
      },
      user: {
        name: 'Joao'
      }
    };
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleSelectTime = this.handleSelectTime.bind(this);
  }
  handleSelectDate(date) {
    this.setState({
      date
    });
  }
  handleSelectTime(time) {
    this.setState({
      time
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact={true} component={Login} />
          <PrivateRoute
            component={Welcome}
            path="/"
            exact={true}
            state={{
              professional: this.state.professional,
              user: this.state.user
            }}
          />
          <PrivateRoute
            path="/schedule/day"
            component={DateScheduler}
            state={{
              onSelect: this.handleSelectDate,
              professional: this.state.professional,
              user: this.state.user
            }}
          />
          <PrivateRoute
            path="/schedule/time"
            component={TimeScheduler}
            state={{
              onSelect: this.handleSelectTime,
              professional: this.state.professional,
              user: this.state.user,
              date: this.state.date
            }}
          />
          <PrivateRoute
            path="/schedule/confirm"
            component={ConfirmScheduler}
            state={{
              professional: this.state.professional,
              user: this.state.user,
              date: this.state.date,
              time: this.state.time
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
