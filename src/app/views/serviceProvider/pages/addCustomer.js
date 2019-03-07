import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import { AddCustomerForm } from '../../../components/serviceProvider';

class AddCustomer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Typography style={{ margin: '25px 0' }} variant="h5">
          Novo Cliente
        </Typography>
        <AddCustomerForm />
      </React.Fragment>
    );
  }
}

export default AddCustomer;
