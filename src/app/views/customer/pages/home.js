import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  CustomerAppointment,
  ScheduleButton
} from '../../../components/customer';
import { customerOperations } from '../../../state/ducks/customer';

class CustomerHome extends PureComponent {
  componentDidMount() {
    const { getCustomer, customerPhone } = this.props;
    getCustomer(customerPhone);
  }
  render() {
    const {
      appointments,
      customerId,
      serviceProviderId,
      deleteAppointment
    } = this.props;

    return (
      <React.Fragment>
        <ScheduleButton redirect="/schedule/day" />
        <CustomerAppointment
          onClick={slotId => {
            deleteAppointment(customerId, serviceProviderId, slotId);
          }}
          appointments={appointments}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  const appointments =
    store.customer.serviceProviders.length > 0
      ? store.customer.serviceProviders[0].appointments
      : [];
  return {
    appointments,
    serviceProviderId: store.serviceProvider._id,
    customerId: store.customer._id,
    customerPhone: store.customer.phone
  };
};

const mapDispatchToProps = {
  deleteAppointment: customerOperations.deleteAppointment,
  getCustomer: customerOperations.getCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerHome);
