import React from 'react';
import { connect } from 'react-redux';
import { Card, List, Typography } from '@material-ui/core';
import AppointmentListItem from './AppointmentListItem';

const AppointmentList = props => {
  const { appointments } = props;
  return (
    <React.Fragment>
      <Typography style={{ margin: 15 }} variant="h6">
        Horários Agendados
      </Typography>
      <Card style={{ margin: 5, padding: 10 }}>
        {appointments.length > 0 ? (
          <List dense={false}>
            {appointments.map(appointment => (
              <AppointmentListItem key={appointment._id} item={appointment} />
            ))}
          </List>
        ) : (
          <Typography>Sem horários agendados</Typography>
        )}
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = store => ({
  appointments: store.appointment.list,
});

export default connect(mapStateToProps)(AppointmentList);
