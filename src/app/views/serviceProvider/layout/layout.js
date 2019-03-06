import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  IconButton
} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ExitIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAddRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { onClickGo } from '../../../utils';
import { history } from '../../../state/store';
import { withStyles } from '@material-ui/core/styles';

const Layout = ({ classes, serviceProvider, children }) => (
  <React.Fragment>
    <header className={classes.header}>
      <Button onClick={onClickGo('/admin')} style={{ textTransform: 'none' }}>
        <Typography style={{ textTransform: 'capitalize' }} variant="h6">
          {serviceProvider.name}
        </Typography>
      </Button>
      <div className="user-wrapper">
        <IconButton onClick={onClickGo('/adminLogin')}>
          <ExitIcon />
        </IconButton>
      </div>
    </header>

    <div className={classes.content}>{children}</div>
    <BottomNavigation
      className={classes.bottomNavigation}
      value={history.location.pathname}
    >
      <BottomNavigationAction
        label="Agenda"
        value="/admin"
        icon={<CalendarIcon />}
        onClick={onClickGo('/admin')}
      />
      <BottomNavigationAction
        label="Novo cliente"
        value="/admin/add/customer"
        onClick={onClickGo('/admin/add/customer')}
        icon={<PersonAddIcon />}
      />
      <BottomNavigationAction
        label="Retornos"
        value="/admin/nextAppointments"
        onClick={onClickGo('/admin/nextAppointments')}
        icon={<ScheduleIcon />}
      />
    </BottomNavigation>
  </React.Fragment>
);

const mapStateToProps = store => ({
  serviceProvider: store.serviceProvider
});

export default connect(mapStateToProps)(
  withStyles({
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.09)'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomNavigation: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      boxShadow: '0px 0px 3px lightgrey',
      borderTop: '1px solid rgba(0,0,0,0.09)'
    }
  })(Layout)
);
