import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Typography,
  IconButton
} from '@material-ui/core';
import { getUpcomingAppointments } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowForward from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL;

const styles = theme => ({
  confirmedButton: {
    color: '#4cb97c',
    borderColor: '#54FF9F'
  },
  pendingButton: {
    color: '#e0b721',
    borderColor: '#e8e85a'
  },
  excludeButton: {
    color: 'red',
    borderColor: 'red'
  },
  notificationTitle: {
    textAlign: 'center',
    padding: 0
  }
});

const createStatusButton = (classes, status) => {
  switch (status) {
    case 0:
      return (
        <React.Fragment>
          <Button
            className={classes.confirmedButton}
            size="small"
            variant="outlined"
          >
            confirmado
          </Button>
        </React.Fragment>
      );
    case 1:
      return (
        <Button
          className={classes.pendingButton}
          size="small"
          variant="outlined"
        >
          Pendente
        </Button>
      );
    case 2:
      return (
        <React.Fragment>
          <ListItemText className={classes.notificationTitle}>
            Notificar via
          </ListItemText>
          <Tooltip title="Notificar via whatsapp">
            <IconButton onClick={evt => {}}>
              <FontAwesomeIcon color="#25d366" icon={['fab', 'whatsapp']} />
            </IconButton>
          </Tooltip>
          <IconButton onClick={evt => {}}>
            <FontAwesomeIcon color="gray" icon={['fas', 'sms']} />
          </IconButton>
        </React.Fragment>
      );
    default:
      return <span />;
  }
};

class ScheduleConfirmList extends PureComponent {
  componentDidMount() {
    // TODO: remove this...
    axios.get(`${API_URL}/serviceprovider`).then(response => {
      this.props.getUpcomingAppointments(response.data[0]._id, moment());
    });
  }
  render() {
    const { upcomingAppointments, classes } = this.props;
    console.log(upcomingAppointments);
    return (
      <React.Fragment>
        <Typography style={{ color: '#1e0c79de', margin: 15 }} variant="h6">
          Eventos Próximos
        </Typography>
        <Card style={{ width: '100%', padding: 10 }}>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography component="span" variant="subtitle1">
                    Horários
                  </Typography>
                }
              />
            </ListItem>
            {upcomingAppointments.map(Appointment => (
              <ListItem style={{ margin: '10px 0' }} key={Appointment._id}>
                <Button
                  style={{
                    padding: '15px 3px',
                    minWidth: '30px'
                  }}
                  size="small"
                >
                  <EditIcon style={{ color: 'grey' }} />
                </Button>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <b>{Appointment.initTimeLabel}</b>
                      <ArrowForward style={{ fontSize: 15 }} />
                      <b>{Appointment.endTimeLabel}</b>
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" color="textPrimary">
                        {Appointment.dayLabel}
                      </Typography>
                      Cliente {Appointment.name}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  {createStatusButton(classes, Appointment.status)}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  upcomingAppointments: store.upcomingAppointments
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUpcomingAppointments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScheduleConfirmList));
