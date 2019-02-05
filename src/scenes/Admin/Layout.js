import React from 'react';
import { connect } from 'react-redux';
import { Button, Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import LoadingOverlay from 'react-loading-overlay';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ExitIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAddRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { withRouter } from 'react-router-dom';

const StyledButton = withStyles({
  root: {
    textTransform: 'none'
  },
  label: {
    display: 'flex',
    flexDirection: 'column'
  }
})(Button);

const Layout = props => {
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
          {props.children}
        </div>
        <footer
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-around',
            boxShadow: '0px 0px 3px lightgrey',
            borderTop: '1px solid rgba(0,0,0,0.09)'
          }}
        >
          <StyledButton
            onClick={event => {
              history.push('/admin');
            }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <CalendarIcon style={{ color: '#5353bf' }} />
            <Typography variant="caption">Agenda</Typography>
          </StyledButton>
          <StyledButton
            onClick={event => {
              history.push('/admin/newCustomer');
            }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <PersonAddIcon style={{ color: '#52af52' }} />
            <Typography variant="caption">Novo Cliente</Typography>
          </StyledButton>
          <StyledButton
            onClick={event => {
              history.push('/admin/nextAppointments');
            }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ScheduleIcon style={{ color: '#e06e6e' }} />
            <Typography variant="caption">Retornos</Typography>
          </StyledButton>
        </footer>
      </LoadingOverlay>
    </div>
  ));

  return <LayoutWithRouter />;
};

const mapStateToProps = store => ({
  serviceProvider: store.serviceProvider
});

export default connect(mapStateToProps)(Layout);
