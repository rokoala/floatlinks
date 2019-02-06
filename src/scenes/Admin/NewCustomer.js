import React from 'react';
import Layout from './Layout';
import { Typography } from '@material-ui/core';
import CustomerForm from '../../components/CustomerForm';

const NewCustomer = () => {
  return (
    <Layout>
      <Typography style={{ margin: '25px 0' }} variant="h5">
        Novo Cliente
      </Typography>
      <CustomerForm />
    </Layout>
  );
};

export default NewCustomer;
