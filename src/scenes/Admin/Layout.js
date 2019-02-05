import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  IconButton
} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ExitIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAddRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { withRouter } from 'react-router-dom';

class Layout extends PureComponent {
  state = {
    value: '/admin'
  };
  render() {
    const { serviceProvider } = this.props;
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

    const LayoutWithRouter = withRouter(({ history }) => (
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
            {this.props.children}
          </div>
          <BottomNavigation
            style={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              boxShadow: '0px 0px 3px lightgrey',
              borderTop: '1px solid rgba(0,0,0,0.09)'
            }}
            value={history.location.pathname}
          >
            <BottomNavigationAction
              label="Agenda"
              value="/admin"
              icon={<CalendarIcon />}
              onClick={() => {
                history.push('/admin');
              }}
            />
            <BottomNavigationAction
              label="Novo cliente"
              value="/admin/newCustomer"
              onClick={() => {
                history.push('/admin/newCustomer');
              }}
              icon={<PersonAddIcon />}
            />
            <BottomNavigationAction
              label="Retornos"
              value="/admin/nextAppointments"
              onClick={() => {
                history.push('/admin/nextAppointments');
              }}
              icon={<ScheduleIcon />}
            />
          </BottomNavigation>
        </LoadingOverlay>
      </div>
    ));

    return <LayoutWithRouter />;
  }
}

const mapStateToProps = store => ({
  serviceProvider: store.serviceProvider
});

export default connect(mapStateToProps)(Layout);
