import React, { Component } from 'react';
import './TimePicker.css';
import TimeButton from './TimeButton';
import moment from 'moment';

export default class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(time) {
    this.props.onClick(time);
  }
  render() {
    const TimeButtons = this.props.hours.map(hour => {
      const aStartTime = hour.startTime.toString().split('');
      const labelStart =
        aStartTime[0] + aStartTime[1] + ':' + aStartTime[2] + aStartTime[3];
      const startTime = moment(labelStart, 'HH:mm');
      const labelEnd = startTime.add(hour.slotDuration, 'm').format('HH:mm');
      return (
        <TimeButton
          onClick={this.onClickHandler}
          key={hour._id}
          time={{
            label: `${labelStart} → ${labelEnd}`,
            available: true,
            slotId: hour._id,
          }}
          selected={hour.selected}
        />
      );
    });

    return <div className="timepicker">{TimeButtons}</div>;
  }
}
