import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppointmentConfirm } from '../../../components/serviceProvider';
import { nextAppointmentsOperation } from '../../../state/ducks/nextAppointments';

class NextAppointments extends PureComponent {
  componentDidMount() {
    const { getNextAppointments, serviceProviderId } = this.props;
    getNextAppointments(serviceProviderId, new Date());
  }
  render() {
    const { nextAppointments } = this.props;
    return <AppointmentConfirm nextAppointments={nextAppointments} />;
  }
}

const mapStateToProps = store => ({
  nextAppointments: store.nextAppointments,
  serviceProviderId: store.serviceProvider._id
});

const mapDispatchToProps = {
  getNextAppointments: nextAppointmentsOperation.get
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextAppointments);
