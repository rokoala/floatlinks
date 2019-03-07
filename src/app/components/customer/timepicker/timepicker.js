import React from 'react';
import TimeButton from './button';
import { createHourLabel } from '../../../utils';

const TimePicker = ({ hours = [], onClick }) => (
  <div className="timepicker">
    {hours.map(hour => (
      <TimeButton
        label={createHourLabel(hour)}
        onClick={onClick}
        key={hour._id}
        {...hour}
      />
    ))}
  </div>
);

export default TimePicker;
