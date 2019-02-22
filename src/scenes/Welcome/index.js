import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import Layout from '../Layout';
import AppointmentList from '../../components/AppointmentList';
import { getAppointments } from '../../actions/';
import './Welcome.css';

class Welcome extends PureComponent {
  componentDidMount() {
    this.props.getAppointments(
      this.props.customerId,
      this.props.serviceProviderId
    );
  }
  render() {
    return (
      <Layout>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
          size="large"
        >
          <AlarmIcon style={{ marginRight: 5 }} />
          agendar
        </Button>
        <AppointmentList />
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  customerId: store.customer._id,
  serviceProviderId: store.serviceProvider._id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAppointments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
