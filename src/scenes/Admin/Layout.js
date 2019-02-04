import React from 'react';
import { connect } from 'react-redux';
import { Button, Typography, IconButton } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ExitIcon from '@material-ui/icons/ExitToApp';

import { withRouter } from 'react-router-dom';

const Layout = props => {
  console.log(props);
  const { serviceProvider } = props;
  const IconButtonSignout = withRouter(({ history }) => (
    <IconButton
      onClick={() => {
        // Handle logout with promise... remove session storage/cookie
        // this.props.logout();
        history.push('/adminLogin');
      }}
    >
      <ExitIcon />
    </IconButton>
  ));

  const ServiceProviderButton = withRouter(({ history }) => (
    <Button
      onClick={event => {
        history.push('/admin');
      }}
      style={{ textTransform: 'none' }}
    >
      <Typography style={{ textTransform: 'capitalize' }} variant="h6">
        {serviceProvider.name}
      </Typography>
    </Button>
  ));

  return (
    <div className="layout">
      <LoadingOverlay
        active={false}
        spinner={<PropagateLoader color={'#36D7B7'} />}
      >
        <header>
          <ServiceProviderButton />
          <div className="user-wrapper">
            <IconButtonSignout />
          </div>
        </header>

        <div className="flex flex-column align-items-center content">
          {props.children}
        </div>
      </LoadingOverlay>
    </div>
  );
};

const mapStateToProps = store => ({
  serviceProvider: store.serviceProvider
});

export default connect(mapStateToProps)(Layout);
