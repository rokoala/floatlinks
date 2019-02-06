import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';
import ScheduleConfirmList from '../../components/ScheduleConfirmList';

const NextAppointments = () => {
  return (
    <Layout>
      <ScheduleConfirmList />
    </Layout>
  );
};

export default connect()(NextAppointments);
