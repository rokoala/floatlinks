import React from 'react';
import { Card, Typography } from '@material-ui/core';
import AppointmentList from './list';

const CustomerAppointment = ({ appointments = [] }) => (
  <React.Fragment>
    <Typography variant="h6">Horários Agendados</Typography>
    <Card>
      {appointments.length > 0 ? (
        <AppointmentList appointments />
      ) : (
        <Typography>Sem horários agendados</Typography>
      )}
    </Card>
  </React.Fragment>
);

export default CustomerAppointment;
