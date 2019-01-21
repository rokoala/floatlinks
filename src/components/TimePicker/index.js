import React, { Component } from 'react';
import './TimePicker.css';
import { Button } from '@material-ui/core';

const hours = [
  { id: 0, label: '09:00 -> 10:00', available: true },
  { id: 1, label: '10:00 -> 11:00', available: true },
  { id: 2, label: '11:00 -> 12:00', available: false },
  { id: 3, label: '12:00 -> 13:00', available: false },
  { id: 4, label: '13:00 -> 14:00', available: true },
  { id: 5, label: '14:00 -> 15:00', available: true },
  { id: 6, label: '15:00 -> 16:00', available: false },
  { id: 7, label: '17:00 -> 18:00', available: true }
];

export default class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOnClick(hourId) {
    this.setState({
      selectedHour: hours[hourId]
    });
  }
  render() {
    const HoursBtn = hours.map(hour => (
      <Button
        onClick={this.handleOnClick.bind(this, hour.id)}
        key={hour.id}
        disabled={!hour.available}
        color={
          hour.id === (this.state.selectedHour && this.state.selectedHour.id)
            ? 'primary'
            : 'default'
        }
        style={{ margin: 5 }}
        variant="outlined"
        size="small"
      >
        {hour.label}
      </Button>
    ));

    return <div className="timepicker">{HoursBtn}</div>;
  }
}
