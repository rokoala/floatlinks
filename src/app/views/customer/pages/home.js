import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  CustomerAppointment,
  ScheduleButton
} from '../../../components/customer';

class CustomerHome extends PureComponent {
  render() {
    const { appointments } = this.props;
    return (
      <React.Fragment>
        <ScheduleButton redirect="/schedule/day" />
        <CustomerAppointment appointments={appointments} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  const appointments =
    store.customer.serviceProviders.length > 0
      ? store.customer.serviceProviders[0].appointments
      : [];
  return { appointments };
};

export default connect(mapStateToProps)(CustomerHome);
