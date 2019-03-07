import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TimePicker } from '../../../../components/customer/timepicker';
import { withStyles } from '@material-ui/core/styles';
import { appointmentOperations } from '../../../../state/ducks/appointment';
import { agendaOperations } from '../../../../state/ducks/agenda';
import { connect } from 'react-redux';
import { history } from '../../../../state/store';
import moment from 'moment';

class ScheduleTime extends PureComponent {
  componentDidMount() {
    const { date, getHoursByDate, serviceProviderId } = this.props;
    getHoursByDate(serviceProviderId, date);

    this.handleClickTimePicker = this.handleClickTimePicker.bind(this);
  }
  handleClickTimePicker(hour) {
    this.props.setAppointmentHour(hour);
    history.push('/schedule/confirm');
  }
  render() {
    const { classes, date, hours } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6">Horários disponíveis</Typography>
        <Button
          className={classes.button}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
        >
          {moment(date).format('l')}
          <ArrowDownIcon fontSize="small" className={classes.icon} />
        </Button>
        <TimePicker onClick={this.handleClickTimePicker} hours={hours} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  serviceProviderId: store.serviceProvider._id,
  date: store.appointment.date,
  hours: store.agenda.hours
});

const mapDispatchToProps = {
  setAppointmentHour: appointmentOperations.setHour,
  getHoursByDate: agendaOperations.getHoursByDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles({
    button: {
      marginTop: 5
    },
    icon: {
      marginLeft: 12
    }
  })(ScheduleTime)
);
