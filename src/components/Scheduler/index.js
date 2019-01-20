import React, { PureComponent } from 'react';
import { Card } from '@material-ui/core';
import TimePicker from '../TimePicker';
import './Scheduler.css';
import Calendar from 'react-calendar';

export default class Scheduler extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showTimePicker: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(date) {
    this.setState({
      showTimePicker: true
    });
  }
  render() {
    return (
      <Card className="scheduler">
        <div className="content">
          <Calendar onChange={this.handleOnChange} />
          {this.state.showTimePicker && <TimePicker />}
        </div>
      </Card>
    );
  }
}
