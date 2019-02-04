import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import Layout from './Layout';
import ScheduleConfirmList from '../../components/ScheduleConfirmList';

const Admin = () => {
  return (
    <Layout>
      <Calendar />
      <ScheduleConfirmList />
    </Layout>
  );
};

export default connect()(Admin);
