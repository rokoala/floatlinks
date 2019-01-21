import React, { Component } from 'react';
import './TimePicker.css';
import TimeButton from './TimeButton';

export default class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(time) {
    this.setState({
      selectedTime: time
    });

    this.props.onClick(time);
  }
  render() {
    const TimeButtons = this.props.hours.map(hour => (
      <TimeButton
        onClick={this.onClickHandler}
        key={hour.id}
        time={hour}
        selected={
          this.state.selectedTime && this.state.selectedTime.id === hour.id
        }
      />
    ));

    return <div className="timepicker">{TimeButtons}</div>;
  }
}
