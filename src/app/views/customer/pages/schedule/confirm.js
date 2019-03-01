import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from '@material-ui/core';
import { formatDate, createHourLabel } from '../../../../utils';
import { connect } from 'react-redux';
import { appointmentOperations } from '../../../../state/ducks/appointment';

class ScheduleConfirm extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6">Confirmar agendamento</Typography>
        <Card style={{ margin: 5, padding: 35, textAlign: 'center' }}>
          <Typography variant="h5">{formatDate(this.props.date)}</Typography>
          <Typography variant="h5">
            {createHourLabel(this.props.hour)}
          </Typography>
        </Card>
        <div style={{ marginTop: 15 }}>
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="primary"
            onClick={evt => {
              this.props.confirmAppointment(
                this.props.hour.slotId,
                '5c785ff53124d102d10b9bee',
                '5c785ff53124d102d10b9bef'
              );
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
