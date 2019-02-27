import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import AppointmentItem from '../item';

const CustomerAppointmentList = ({ appointments = [{ _id: '1' }] }) => (
  <List>
    {appointments.map(appointment => (
      <AppointmentItem key={appointment._id} {...appointment} />
    ))}
  </List>
);

CustomerAppointmentList.propTypes = {
  appointments: PropTypes.array
};

export default CustomerAppointmentList;
