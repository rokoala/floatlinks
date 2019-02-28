import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppointmentList from './list';

const CustomerAppointment = ({ classes, appointments = [] }) => (
  <React.Fragment>
    <Typography className={classes.title} variant="h6">
      Horários Agendados
    </Typography>
    <Card className={classes.card}>
      {appointments.length > 0 ? (
        <AppointmentList appointments={appointments} />
      ) : (
        <Typography>Sem horários agendados</Typography>
      )}
    </Card>
  </React.Fragment>
);

export default withStyles({
  title: {
    margin: 15
  },
  card: {
    margin: 5,
    padding: 10
  }
})(CustomerAppointment);
