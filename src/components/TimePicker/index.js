import React, { PureComponent } from 'react';
import './TimePicker.css';
import { Typography, Button } from '@material-ui/core';

export default class TimePicker extends PureComponent {
  render() {
    const hours = [
      { label: '09:00 -> 10:00', available: true },
      { label: '10:00 -> 11:00', available: true },
      { label: '11:00 -> 12:00', available: false },
      { label: '12:00 -> 13:00', available: false },
      { label: '13:00 -> 14:00', available: true },
      { label: '14:00 -> 15:00', available: true },
      { label: '15:00 -> 16:00', available: false },
      { label: '17:00 -> 18:00', available: true }
    ];

    const HoursBtn = hours.map(hour => (
      <Button
        disabled={!hour.available}
        style={{ margin: 5 }}
        variant="outlined"
        size="small"
      >
        <Typography variant="buttonText">{hour.label}</Typography>
      </Button>
    ));

    return <div className="timepicker">{HoursBtn}</div>;
  }
}
