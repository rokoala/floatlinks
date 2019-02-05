import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import Layout from './Layout';
import ScheduleConfirmList from '../../components/ScheduleConfirmList';

const Admin = () => {
  return (
    <Layout>
      <div style={{ margin: 15 }}>
        <Calendar />
      </div>
      <ScheduleConfirmList />
    </Layout>
  );
};

export default connect()(Admin);
