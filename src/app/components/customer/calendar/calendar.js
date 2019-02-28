import React from 'react';
import CalendarLegend from './legend';
import { Calendar as ReactCalendar } from 'react-calendar';

const Calendar = ({ showLegend, ...options }) => (
  <React.Fragment>
    <ReactCalendar {...options} />
    {showLegend && <CalendarLegend />}
  </React.Fragment>
);

export default Calendar;
