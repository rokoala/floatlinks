import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Calendar from 'react-calendar';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { setDate } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleList from '../../components/ScheduleList';
import './DateScheduler.css';

class DateScheduler extends PureComponent {
  render() {
    const CalendarRouter = withRouter(({ history }) => (
      <Calendar
        minDetail="year"
        locale="pt-BR"
        tileClassName={({ date }) => {
          // check if date is already scheduled by user
          if (date.getDate() % 2 === 0 && date.getDay() !== 4)
            return 'day-scheduled white-font';
        }}
        // check if the day is already full
        tileDisabled={({ date }) => date.getDay() === 4}
        onChange={date => {
          this.props.setDate(date);
          history.push('/schedule/time');
        }}
      />
    ));

    return (
      <Layout>
        <CalendarRouter />
        <ul className="legend">
          <li>
            <div className="block day-scheduled" />
            <Typography variant="caption">Meus horários</Typography>
          </li>
          <li>
            <div className="block day-unavailable" />
            <Typography variant="caption">Indisponível</Typography>
          </li>
        </ul>
        <ScheduleList />
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/"
          variant="outlined"
        >
          Cancelar
        </Button>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDate
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(DateScheduler);
