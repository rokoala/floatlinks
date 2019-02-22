import React, { PureComponent } from 'react';
import { Typography, Button, Card } from '@material-ui/core';
import Layout from '../Layout';
import { Link, withRouter } from 'react-router-dom';
import { formatDate } from '../../utils/Formatter';
import { confirmAppointment } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ConfirmAppointment extends PureComponent {
  render() {
    const ButtonConfirm = withRouter(({ history }) => (
      <Button
        style={{ margin: 5 }}
        variant="outlined"
        color="primary"
        onClick={evt => {
          this.props.confirmAppointment(
            this.props.hour.slotId,
            this.props.customerId,
            this.props.serviceProviderId
          );
        }}
      >
        confirmo
      </Button>
    ));

    return (
      <Layout>
        <Typography variant="h6">Confirmar agendamento</Typography>
        <Card style={{ margin: 5, padding: 35, textAlign: 'center' }}>
          <Typography variant="h5">{formatDate(this.props.date)}</Typography>
          <Typography variant="h5">
            {this.props.hour && this.props.hour.label}
          </Typography>
        </Card>
        <div style={{ marginTop: 15 }}>
          <ButtonConfirm />
          <Button
            style={{ margin: 5 }}
            component={Link}
            to="/"
            variant="outlined"
          >
            cancelar
          </Button>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  date: store.appointment.current.date,
  hour: store.appointment.current.hour,
  customerId: store.customer._id,
  serviceProviderId: store.serviceProvider._id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      confirmAppointment
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmAppointment);
