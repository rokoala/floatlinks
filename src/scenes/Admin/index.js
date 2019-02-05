import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import Layout from './Layout';

const Admin = () => {
  return (
    <Layout>
      <div style={{ margin: 15 }}>
        <Calendar />
      </div>
    </Layout>
  );
};

export default connect()(Admin);
