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
      <React.Fragment>
        <Card className="scheduler">
          <div className="content">
            <Calendar locale="pt-BR" onChange={this.handleOnChange} />
          </div>
        </Card>
        {this.state.showTimePicker && (
          <Card style={{ marginTop: 10, maxWidth: 400 }}>
            <TimePicker />
          </Card>
        )}
      </React.Fragment>
    );
  }
}
