import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from '@material-ui/core';
import { formatDate, createHourLabel } from '../../../../utils';
import { connect } from 'react-redux';
import { appointmentOperations } from '../../../../state/ducks/appointment';

class ScheduleConfirm extends PureComponent {
  render() {
    const {
      date,
      confirmAppointment,
      customerId,
      hour,
      serviceProviderId
    } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6">Confirmar agendamento</Typography>
        <Card style={{ margin: 5, padding: 35, textAlign: 'center' }}>
          <Typography variant="h5">{formatDate(date)}</Typography>
          <Typography variant="h5">{createHourLabel(hour)}</Typography>
        </Card>
        <div style={{ marginTop: 15 }}>
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="primary"
            onClick={evt => {
              confirmAppointment(hour._id, customerId, serviceProviderId);
            }}
          >
            confirmo
          </Button>
          <Button
            style={{ margin: 5 }}
            component={Link}
            to="/"
            variant="outlined"
          >
            cancelar
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  serviceProviderId: store.serviceProvider._id,
  customerId: store.customer._id,
  date: store.appointment.date,
  hour: store.appointment.hour
});

const mapDispatchToProps = {
  confirmAppointment: appointmentOperations.confirm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleConfirm);
