import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions';
import { Avatar, Button, Typography, IconButton } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';
import './Layout.css';

class Layout extends PureComponent {
  render() {
    const { serviceProvider, customer } = this.props;

    const IconButtonSignout = withRouter(({ history }) => (
      <IconButton
        onClick={() => {
          // Handle logout with promise... remove session storage/cookie
          this.props.logout();
          history.push('/');
        }}
      >
        <ExitIcon />
      </IconButton>
    ));

    const ProfileIconButton = withRouter(({ history }) => (
      <IconButton
        onClick={event => {
          event.preventDefault();
          history.push('/profile');
        }}
      >
        <Avatar>{customer.name.charAt(0)}</Avatar>
      </IconButton>
    ));

    const ServiceProviderButton = withRouter(({ history }) => (
      <Button
        onClick={event => {
          history.push('/');
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
            <ProfileIconButton />
            <ServiceProviderButton />
            <div className="user-wrapper">
              <IconButtonSignout />
            </div>
          </header>

          <div className="flex flex-column align-items-center content">
            {this.props.children}
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  customer: store.customer,
  serviceProvider: store.serviceProvider,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
