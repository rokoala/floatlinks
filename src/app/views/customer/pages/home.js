import React from 'react';
import {
  CustomerAppointment,
  ScheduleButton
} from '../../../components/customer';

const CustomerHome = () => (
  <React.Fragment>
    <ScheduleButton redirect="/schedule/day" />
    <CustomerAppointment />
  </React.Fragment>
);

export default CustomerHome;
