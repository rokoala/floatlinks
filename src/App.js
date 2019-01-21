import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './scenes/Welcome';
import DateScheduler from './scenes/DateScheduler';
import TimeScheduler from './scenes/TimeScheduler';
import ConfirmScheduler from './scenes/ConfirmScheduler';
import './App.css';

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
          <Route
            path="/"
            exact={true}
            render={() => (
              <Welcome
                professional={this.state.professional}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/schedule/day"
            render={() => (
              <DateScheduler
                onSelect={this.handleSelectDate}
                professional={this.state.professional}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/schedule/time"
            render={() => (
              <TimeScheduler
                onSelect={this.handleSelectTime}
                professional={this.state.professional}
                user={this.state.user}
                date={this.state.date}
              />
            )}
          />
          <Route
            path="/schedule/confirm"
            render={() => (
              <ConfirmScheduler
                professional={this.state.professional}
                user={this.state.user}
                date={this.state.date}
                time={this.state.time}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
