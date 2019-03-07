import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  CustomerAppointment,
  ScheduleButton
} from '../../../components/customer';
import { customerOperations } from '../../../state/ducks/customer';
import { serviceProviderOperations } from '../../../state/ducks/serviceProvider';

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class CustomerHome extends PureComponent {
  componentDidMount() {
    axios.get(`${API_URL}/customer`).then(response => {
      this.props.setCustomer(response.data[2]);
    });
    axios.get(`${API_URL}/serviceprovider`).then(response => {
      this.props.setServiceProvider(response.data[0]);
    });
  }
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

const mapDispatchToProps = {
  setServiceProvider: serviceProviderOperations.setServiceProvider,
  setCustomer: customerOperations.setCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerHome);
