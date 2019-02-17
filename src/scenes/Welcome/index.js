import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import Layout from '../Layout';
import AppointmentList from '../../components/AppointmentList';
import { getAppointments, getServiceProvider } from '../../actions/';
import './Welcome.css';

class Welcome extends PureComponent {
  componentDidMount() {
    this.props.getAppointments();

    // this should not be here...
    this.props.getServiceProvider(1611112222);
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAppointments,
      getServiceProvider,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(Welcome);
