import React, { PureComponent } from 'react';
import { Card, Button } from '@material-ui/core';
import TimePicker from '../TimePicker';
import './Scheduler.css';
import Calendar from 'react-calendar';

export default class Scheduler extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showTimePicker: false,
      showConfirmButton: false,
      time: null,
      date: null
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClickTimePicker = this.handleClickTimePicker.bind(this);
    this.handleOnConfirm = this.handleOnConfirm.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
  }
  componentDidMount() {
    // fetch data...
    this.setState({
      client: {
        hours: [
          { id: 0, label: '09:00 -> 10:00', available: true },
          { id: 1, label: '10:00 -> 11:00', available: true },
          { id: 2, label: '11:00 -> 12:00', available: false },
          { id: 3, label: '12:00 -> 13:00', available: false },
          { id: 4, label: '13:00 -> 14:00', available: true },
          { id: 5, label: '14:00 -> 15:00', available: true },
          { id: 6, label: '15:00 -> 16:00', available: false },
          { id: 7, label: '17:00 -> 18:00', available: true }
        ]
      }
    });
  }
  handleOnChange(date) {
    this.setState({
      showTimePicker: true,
      date
    });
  }
  handleClickTimePicker(time) {
    this.setState({
      showConfirmButton: true,
      time
    });
  }
  reset() {
    this.setState({
      showConfirmButton: false,
      showTimePicker: false,
      date: null,
      time: null
    });
  }
  handleOnConfirm(evt) {
    evt.preventDefault();

    this.props.onSelect({
      date: this.state.date,
      time: this.state.time
    });

    this.reset();
  }
  handleOnCancel(evt) {
    evt.preventDefault();
    this.reset();
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
            <TimePicker
              onClick={this.handleClickTimePicker}
              hours={this.state.client.hours}
            />
          </Card>
        )}
        {this.state.showConfirmButton && (
          <div style={{ marginTop: 5 }}>
            <Button
              style={{ margin: 3 }}
              variant="contained"
              color="primary"
              onClick={this.handleOnConfirm}
            >
              Ok
            </Button>
            <Button style={{ margin: 3 }} onClick={this.handleOnCancel}>
              Cancelar
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
