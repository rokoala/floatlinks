import React from 'react';
import { connect } from 'react-redux';
import { Card, List, Typography } from '@material-ui/core';
import AppointmentListItem from './AppointmentListItem';

const AppointmentList = ({ appointments = [] }) => (
  <React.Fragment>
    <Typography style={{ margin: 15 }} variant="h6">
      Horários Agendados
    </Typography>
    <Card style={{ margin: 5, padding: 10 }}>
      <List dense={false}>
        {appointments.map(schedule => (
          <AppointmentListItem key={schedule._id} item={schedule} />
        ))}
      </List>
    </Card>
  </React.Fragment>
);

const mapStateToProps = state => ({
  appointments: state.appointment.list
});

export default connect(mapStateToProps)(AppointmentList);
