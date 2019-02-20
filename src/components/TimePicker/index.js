import React, { Component } from 'react';
import './TimePicker.css';
import TimeButton from './TimeButton';
import { createHourLabel } from '../../resources/utils';

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
      const label = createHourLabel(hour);
      return (
        <TimeButton
          onClick={this.onClickHandler}
          key={hour._id}
          time={{
            label: label,
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
